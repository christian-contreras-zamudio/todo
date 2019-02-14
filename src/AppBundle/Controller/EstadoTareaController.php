<?php

namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Translation\TranslatorInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Pagerfanta\Pagerfanta;
use Pagerfanta\Adapter\DoctrineORMAdapter;
use Pagerfanta\View\TwitterBootstrap3View;

use Symfony\Component\HttpFoundation\Response;
// SECURITY
use Symfony\Component\ExpressionLanguage\Expression;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

use AppBundle\Entity\EstadoTarea;

/**
 * EstadoTarea controller.
 *
 * @Route("/estadotarea")
 */
class EstadoTareaController extends Controller
{
    /**
     * Lists all EstadoTarea entities.
     *
     * @Route("/", name="estadotarea")
     * @Method("GET")
     */
    public function indexAction(Request $request/*, AuthorizationCheckerInterface $authorizationChecker*/)
    {
        // revisamos roles
        /*$access2 = $authorizationChecker->isGranted(new Expression(
                'has_role("ROLE_ESTADOTAREA") or has_role("ROLE_ESTADOTAREA_ALL")'
        ));

        if (!$access2) {
            $html = $this->renderView('Exception/error-acceso.html.twig', array(
            ));
            $response = new Response($html, Response::HTTP_FORBIDDEN);
            return $response;
        }

        if ($this->container->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            $user = $this->container->get('security.token_storage')->getToken()->getUser();
        }*/
        $em = $this->getDoctrine()->getManager();
        $queryBuilder = $em->getRepository('AppBundle:EstadoTarea')->createQueryBuilder('e');
        /*$queryBuilder
                ->where('e.deleteStatus is null')
                ->andWhere('e.rfcEmpresaAlta = :rfc')
                ->setParameter('rfc', $user->getRfc());*/

        list($filterForm, $queryBuilder) = $this->filter($queryBuilder, $request);
        list($estadoTareas, $pagerHtml) = $this->paginator($queryBuilder, $request);
        
        $totalOfRecordsString = $this->getTotalOfRecordsString($queryBuilder, $request);

        return $this->render('estadotarea/index.html.twig', array(
            'estadoTareas' => $estadoTareas,
            'pagerHtml' => $pagerHtml,
            'filterForm' => $filterForm->createView(),
            'totalOfRecordsString' => $totalOfRecordsString,

        ));
    }

    /**
    * Create filter form and process filter request.
    *
    */
    protected function filter($queryBuilder, Request $request)
    {
        $session = $request->getSession();
        $filterForm = $this->createForm('AppBundle\Form\EstadoTareaFilterType');

        // Reset filter
        if ($request->get('filter_action') == 'reset') {
            $session->remove('EstadoTareaControllerFilter');
        }

        // Filter action
        if ($request->get('filter_action') == 'filter') {
            // Bind values from the request
            $filterForm->handleRequest($request);

            if ($filterForm->isValid()) {
                // Build the query from the given form object
                $this->get('lexik_form_filter.query_builder_updater')->addFilterConditions($filterForm, $queryBuilder);
                // Save filter to session
                $filterData = $filterForm->getData();
                $session->set('EstadoTareaControllerFilter', $filterData);
            }
        } else {
            // Get filter from session
            if ($session->has('EstadoTareaControllerFilter')) {
                $filterData = $session->get('EstadoTareaControllerFilter');
                
                foreach ($filterData as $key => $filter) { //fix for entityFilterType that is loaded from session
                    if (is_object($filter)) {
                        $filterData[$key] = $queryBuilder->getEntityManager()->merge($filter);
                    }
                }
                
                $filterForm = $this->createForm('AppBundle\Form\EstadoTareaFilterType', $filterData);
                $this->get('lexik_form_filter.query_builder_updater')->addFilterConditions($filterForm, $queryBuilder);
            }
        }

        return array($filterForm, $queryBuilder);
    }


    /**
    * Get results from paginator and get paginator view.
    *
    */
    protected function paginator($queryBuilder, Request $request)
    {
        //sorting
        $sortCol = $queryBuilder->getRootAlias().'.'.$request->get('pcg_sort_col', 'id');
        $queryBuilder->orderBy($sortCol, $request->get('pcg_sort_order', 'desc'));
        // Paginator
        $adapter = new DoctrineORMAdapter($queryBuilder);
        $pagerfanta = new Pagerfanta($adapter);
        $pagerfanta->setMaxPerPage($request->get('pcg_show' , 10));

        try {
            $pagerfanta->setCurrentPage($request->get('pcg_page', 1));
        } catch (\Pagerfanta\Exception\OutOfRangeCurrentPageException $ex) {
            $pagerfanta->setCurrentPage(1);
        }
        
        $entities = $pagerfanta->getCurrentPageResults();

        // Paginator - route generator
        $me = $this;
        $routeGenerator = function($page) use ($me, $request)
        {
            $requestParams = $request->query->all();
            $requestParams['pcg_page'] = $page;
            return $me->generateUrl('estadotarea', $requestParams);
        };

        // Paginator - view
        $view = new TwitterBootstrap3View();
        $pagerHtml = $view->render($pagerfanta, $routeGenerator, array(
            'proximity' => 3,
            'prev_message' => 'previous',
            'next_message' => 'next',
        ));

        return array($entities, $pagerHtml);
    }
    
    
    
    /*
     * Calculates the total of records string
     */
    protected function getTotalOfRecordsString($queryBuilder, $request) {
        $totalOfRecords = $queryBuilder->select('COUNT(e.id)')->getQuery()->getSingleScalarResult();
        $show = $request->get('pcg_show', 10);
        $page = $request->get('pcg_page', 1);

        $startRecord = ($show * ($page - 1)) + 1;
        $endRecord = $show * $page;

        if ($endRecord > $totalOfRecords) {
            $endRecord = $totalOfRecords;
        }
        return "Showing $startRecord - $endRecord of $totalOfRecords Records.";
    }
    
    

    /**
     * Displays a form to create a new EstadoTarea entity.
     *
     * @Route("/new", name="estadotarea_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request, TranslatorInterface $translator/*, AuthorizationCheckerInterface $authorizationChecker*/)
    {
        // revisamos roles
        /*$access2 = $authorizationChecker->isGranted(new Expression(
                'has_role("ROLE_ESTADOTAREA_NEW") or has_role("ROLE_ESTADOTAREA_ALL")'
        ));

        if (!$access2) {
            $html = $this->renderView('Exception/error-acceso.html.twig', array());
            $response = new Response($html, Response::HTTP_FORBIDDEN);
            return $response;
        }*/
        
        $estadoTarea = new EstadoTarea();
        $form   = $this->createForm('AppBundle\Form\EstadoTareaType', $estadoTarea);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /*if ($this->container->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
                $user = $this->container->get('security.token_storage')->getToken()->getUser();
                $estadoTarea->setUserId($user);
                $estadoTarea->setRfcEmpresaAlta($user->getRfc());
            }*/
            $em = $this->getDoctrine()->getManager();
            $em->persist($estadoTarea);
            $em->flush();
            
            // traduccion flash
            $translated = $translator->trans('flash_mensaje.nuevo_creado', array('%entity%' => 'estadoTarea'));
                        
            $editLink = $this->generateUrl('estadotarea_edit', array('id' => $estadoTarea->getId()));
            $this->get('session')->getFlashBag()->add('success', "<a href='$editLink'>".$translated."</a>" );
            
            $nextAction=  $request->get('submit') == 'save' ? 'estadotarea' : 'estadotarea_new';
            return $this->redirectToRoute($nextAction);
        }
        return $this->render('estadotarea/new.html.twig', array(
            'estadoTarea' => $estadoTarea,
            'form'   => $form->createView(),
        ));
    }
    

    /**
     * Finds and displays a EstadoTarea entity.
     *
     * @Route("/{id}", name="estadotarea_show")
     * @Method("GET")
     */
    public function showAction(EstadoTarea $estadoTarea/*, AuthorizationCheckerInterface $authorizationChecker*/)
    {
        // revisamos roles
        /*$access2 = $authorizationChecker->isGranted(new Expression(
                'has_role("ROLE_ESTADOTAREA") or has_role("ROLE_ESTADOTAREA_ALL")'
        ));

        if (!$access2) {
            $html = $this->renderView('Exception/error-acceso.html.twig', array(
            ));
            $response = new Response($html, Response::HTTP_FORBIDDEN);
            return $response;
        }

        if ($this->container->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            $user = $this->container->get('security.token_storage')->getToken()->getUser();
        }

        if ($estadoTarea->getRfcEmpresaAlta() == $user->getRfc()) {
            //return new Response('tuyo');
        } else {
            //return new Response('no tuyo');
            return $this->redirectToRoute('estadotarea', []);
        }*/
        $deleteForm = $this->createDeleteForm($estadoTarea);
        return $this->render('estadotarea/show.html.twig', array(
            'estadoTarea' => $estadoTarea,
            'delete_form' => $deleteForm->createView(),
        ));
    }
    
    

    /**
     * Displays a form to edit an existing EstadoTarea entity.
     *
     * @Route("/{id}/edit", name="estadotarea_edit")
     * @Method({"GET", "POST"})
     */
    public function editAction(Request $request, EstadoTarea $estadoTarea, TranslatorInterface $translator/*, AuthorizationCheckerInterface $authorizationChecker*/)
    {
        // revisamos roles
        /*$access2 = $authorizationChecker->isGranted(new Expression(
                'has_role("ROLE_ESTADOTAREA_EDIT") or has_role("ROLE_ESTADOTAREA_ALL")'
        ));

        if (!$access2) {
            $html = $this->renderView('Exception/error-acceso.html.twig', array(
            ));
            $response = new Response($html, Response::HTTP_FORBIDDEN);
            return $response;
        }

        if ($this->container->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            $user = $this->container->get('security.token_storage')->getToken()->getUser();
        }

        if ($estadoTarea->getRfcEmpresaAlta() == $user->getRfc()) {
            //return new Response('tuyo');
        } else {
            //return new Response('no tuyo');
            return $this->redirectToRoute('estadotarea', []);
        }*/
        $deleteForm = $this->createDeleteForm($estadoTarea);
        $editForm = $this->createForm('AppBundle\Form\EstadoTareaType', $estadoTarea);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $em = $this->getDoctrine()->getManager();
            //$estadoTarea->setUserUpdateId($user->getId());
            $em->persist($estadoTarea);
            $em->flush();
            
            // traduccion flash
            $translated = $translator->trans('flash_mensaje.editado');
            
            $this->get('session')->getFlashBag()->add('success', $translated);
            return $this->redirectToRoute('estadotarea_edit', array('id' => $estadoTarea->getId()));
        }
        return $this->render('estadotarea/edit.html.twig', array(
            'estadoTarea' => $estadoTarea,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }
    
    

    /**
     * Deletes a EstadoTarea entity.
     *
     * @Route("/{id}", name="estadotarea_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, EstadoTarea $estadoTarea, TranslatorInterface $translator, AuthorizationCheckerInterface $authorizationChecker)
    {
        // revisamos roles
        $access2 = $authorizationChecker->isGranted(new Expression(
                'has_role("ROLE_ESTADOTAREA_DELETE") or has_role("ROLE_ESTADOTAREA_ALL")'
        ));

        if (!$access2) {
            $html = $this->renderView('Exception/error-acceso.html.twig', array(
            ));
            $response = new Response($html, Response::HTTP_FORBIDDEN);
            return $response;
        }

        if ($this->container->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            $user = $this->container->get('security.token_storage')->getToken()->getUser();
        }

        if ($estadoTarea->getRfcEmpresaAlta() == $user->getRfc()) {
            //return new Response('tuyo');
        } else {
            //return new Response('no tuyo');
            return $this->redirectToRoute('estadotarea', []);
        }
        
        $form = $this->createDeleteForm($estadoTarea);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            // delete logico
            $estadoTarea->setDeleteStatus(0);
            $estadoTarea->setDeletedAt(new \DateTime());
            $estadoTarea->setUserDeleteId($user);
            $em->persist($estadoTarea);
            //$em->remove($estadoTarea);
            $em->flush();
            
            // traduccion flash
            $translated = $translator->trans('flash_mensaje.eliminado', array('%entity%' => 'EstadoTarea'));
            
            $this->get('session')->getFlashBag()->add('success', $translated);
        } else {
            // traduccion flash
            $translated = $translator->trans('flash_mensaje.problema_eliminar', array('%entity%' => 'EstadoTarea'));
            
            $this->get('session')->getFlashBag()->add('error', $translated);
        }
        
        return $this->redirectToRoute('estadotarea');
    }
    
    /**
     * Creates a form to delete a EstadoTarea entity.
     *
     * @param EstadoTarea $estadoTarea The EstadoTarea entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(EstadoTarea $estadoTarea)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('estadotarea_delete', array('id' => $estadoTarea->getId())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
    
    /**
     * Delete EstadoTarea by id
     *
     * @Route("/delete/{id}", name="estadotarea_by_id_delete")
     * @Method("GET")
     */
    public function deleteByIdAction(EstadoTarea $estadoTarea, TranslatorInterface $translator, AuthorizationCheckerInterface $authorizationChecker){
        // revisamos roles
        $access2 = $authorizationChecker->isGranted(new Expression(
                'has_role("ROLE_ESTADOTAREA_DELETE") or has_role("ROLE_ESTADOTAREA_ALL")'
        ));

        if (!$access2) {
            $html = $this->renderView('Exception/error-acceso.html.twig', array(
            ));
            $response = new Response($html, Response::HTTP_FORBIDDEN);
            return $response;
        }

        if ($this->container->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            $user = $this->container->get('security.token_storage')->getToken()->getUser();
        }

        if ($estadoTarea->getRfcEmpresaAlta() == $user->getRfc()) {
            //return new Response('tuyo');
        } else {
            //return new Response('no tuyo');
            return $this->redirectToRoute('estadotarea', []);
        }
        
        $em = $this->getDoctrine()->getManager();
        
        try {
            // delete logico
            $estadoTarea->setDeleteStatus(0);
            $estadoTarea->setDeletedAt(new \DateTime());
            $estadoTarea->setUserDeleteId($user);
            $em->persist($estadoTarea);
            //$em->remove($estadoTarea);
            $em->flush();
            // traduccion flash
            $translated = $translator->trans('flash_mensaje.eliminado', array('%entity%' => 'EstadoTarea'));
            $this->get('session')->getFlashBag()->add('success', $translated);
        } catch (Exception $ex) {
            // traduccion flash
            $translated = $translator->trans('flash_mensaje.problema_eliminar', array('%entity%' => 'EstadoTarea'));
            $this->get('session')->getFlashBag()->add('error', $translated);
        }

        return $this->redirect($this->generateUrl('estadotarea'));

    }
    

    /**
    * Bulk Action
    * @Route("/bulk-action/", name="estadotarea_bulk_action")
    * @Method("POST")
    */
    public function bulkAction(Request $request, TranslatorInterface $translator, AuthorizationCheckerInterface $authorizationChecker)
    {
        // revisamos roles
        $access2 = $authorizationChecker->isGranted(new Expression(
                'has_role("ROLE_ESTADOTAREA_DELETE") or has_role("ROLE_ESTADOTAREA_ALL")'
        ));

        if (!$access2) {
            $html = $this->renderView('Exception/error-acceso.html.twig', array(
            ));
            $response = new Response($html, Response::HTTP_FORBIDDEN);
            return $response;
        }

        if ($this->container->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            $user = $this->container->get('security.token_storage')->getToken()->getUser();
        }
        
        $ids = $request->get("ids", array());
        $action = $request->get("bulk_action", "delete");

        if ($action == "delete") {
            try {
                $em = $this->getDoctrine()->getManager();
                $repository = $em->getRepository('AppBundle:EstadoTarea');

                foreach ($ids as $id) {
                    $estadoTarea = $repository->find($id);
                    
                    if ($estadoTarea->getRfcEmpresaAlta() == $user->getRfc()) {
                        //return new Response('tuyo');
                    } else {
                        //return new Response('no tuyo');
                        return $this->redirectToRoute('estadotarea', []);
                    }

                    // delete logico
                    $estadoTarea->setDeleteStatus(0);
                    $estadoTarea->setDeletedAt(new \DateTime());
                    $estadoTarea->setUserDeleteId($user);
                    $em->persist($estadoTarea);
                    //$em->remove($estadoTarea);
                    $em->flush();
                }
                
                // traduccion flash
                $translated = $translator->trans('flash_mensaje.eliminado_plural', array('%entity%' => 'estadoTareas'));
                $this->get('session')->getFlashBag()->add('success', $translated);

            } catch (Exception $ex) {
                // traduccion flash
                $translated = $translator->trans('flash_mensaje.problema_eliminar_plural', array('%entity%' => 'estadoTareas'));
                $this->get('session')->getFlashBag()->add('error', $translated);
            }
        }

        return $this->redirect($this->generateUrl('estadotarea'));
    }
    

}
