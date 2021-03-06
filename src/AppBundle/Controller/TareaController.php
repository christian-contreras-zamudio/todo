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

use AppBundle\Entity\Tarea;

/**
 * Tarea controller.
 *
 * @Route("/tarea")
 */
class TareaController extends Controller
{
    /**
     * Lists all Tarea entities.
     *
     * @Route("/", name="tarea")
     * @Method("GET")
     */
    public function indexAction(Request $request/*, AuthorizationCheckerInterface $authorizationChecker*/)
    {
        // revisamos roles
        /*$access2 = $authorizationChecker->isGranted(new Expression(
                'has_role("ROLE_TAREA") or has_role("ROLE_TAREA_ALL")'
        ));

        if (!$access2) {
            $html = $this->renderView('Exception/error-acceso.html.twig', array(
            ));
            $response = new Response($html, Response::HTTP_FORBIDDEN);
            return $response;
        }

        */
        if ($this->container->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            $user = $this->container->get('security.token_storage')->getToken()->getUser();
        }
        $em = $this->getDoctrine()->getManager();
        $queryBuilder = $em->getRepository('AppBundle:Tarea')->createQueryBuilder('e');
        $queryBuilder
                ->where('e.userId = :userId')
                ->setParameter('userId', $user->getId());

        list($filterForm, $queryBuilder) = $this->filter($queryBuilder, $request);
        list($tareas, $pagerHtml) = $this->paginator($queryBuilder, $request);
        
        $totalOfRecordsString = $this->getTotalOfRecordsString($queryBuilder, $request);
        
        $estado = $em->getRepository('AppBundle:EstadoTarea')->findAll();

        return $this->render('tarea/index.html.twig', array(
            'tareas' => $tareas,
            'pagerHtml' => $pagerHtml,
            'filterForm' => $filterForm->createView(),
            'totalOfRecordsString' => $totalOfRecordsString,
            'estados'=>$estado

        ));
    }

    /**
    * Create filter form and process filter request.
    *
    */
    protected function filter($queryBuilder, Request $request)
    {
        $session = $request->getSession();
        $filterForm = $this->createForm('AppBundle\Form\TareaFilterType');

        // Reset filter
        if ($request->get('filter_action') == 'reset') {
            $session->remove('TareaControllerFilter');
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
                $session->set('TareaControllerFilter', $filterData);
            }
        } else {
            // Get filter from session
            if ($session->has('TareaControllerFilter')) {
                $filterData = $session->get('TareaControllerFilter');
                
                foreach ($filterData as $key => $filter) { //fix for entityFilterType that is loaded from session
                    if (is_object($filter)) {
                        $filterData[$key] = $queryBuilder->getEntityManager()->merge($filter);
                    }
                }
                
                $filterForm = $this->createForm('AppBundle\Form\TareaFilterType', $filterData);
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
            return $me->generateUrl('tarea', $requestParams);
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
     * Displays a form to create a new Tarea entity.
     *
     * @Route("/new", name="tarea_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request, TranslatorInterface $translator/*, AuthorizationCheckerInterface $authorizationChecker*/)
    {
        // revisamos roles
        /*$access2 = $authorizationChecker->isGranted(new Expression(
                'has_role("ROLE_TAREA_NEW") or has_role("ROLE_TAREA_ALL")'
        ));

        if (!$access2) {
            $html = $this->renderView('Exception/error-acceso.html.twig', array());
            $response = new Response($html, Response::HTTP_FORBIDDEN);
            return $response;
        }*/
        
        $tarea = new Tarea();
        $form   = $this->createForm('AppBundle\Form\TareaType', $tarea);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            if ($this->container->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
                $user = $this->container->get('security.token_storage')->getToken()->getUser();
                $tarea->setUserId($user);
            }
            $em = $this->getDoctrine()->getManager();
            $em->persist($tarea);
            $em->flush();
            
            // traduccion flash
            $translated = $translator->trans('flash_mensaje.nuevo_creado', array('%entity%' => 'tarea'));
                        
            $editLink = $this->generateUrl('tarea_edit', array('id' => $tarea->getId()));
            $this->get('session')->getFlashBag()->add('success', "<a href='$editLink'>".$translated."</a>" );
            
            $nextAction=  $request->get('submit') == 'save' ? 'tarea' : 'tarea_new';
            return $this->redirectToRoute($nextAction);
        }
        return $this->render('tarea/new.html.twig', array(
            'tarea' => $tarea,
            'form'   => $form->createView(),
        ));
    }
    

    /**
     * Finds and displays a Tarea entity.
     *
     * @Route("/{id}", name="tarea_show")
     * @Method("GET")
     */
    public function showAction(Tarea $tarea/*, AuthorizationCheckerInterface $authorizationChecker*/)
    {
        // revisamos roles
        /*$access2 = $authorizationChecker->isGranted(new Expression(
                'has_role("ROLE_TAREA") or has_role("ROLE_TAREA_ALL")'
        ));

        if (!$access2) {
            $html = $this->renderView('Exception/error-acceso.html.twig', array(
            ));
            $response = new Response($html, Response::HTTP_FORBIDDEN);
            return $response;
        }*/

        if ($this->container->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            $user = $this->container->get('security.token_storage')->getToken()->getUser();
        }

        if ($tarea->getUserId()->getId() == $user->getId()) {
            //return new Response('tuyo');
        } else {
            //return new Response('no tuyo');
            return $this->redirectToRoute('tarea', []);
        }
        $deleteForm = $this->createDeleteForm($tarea);
        return $this->render('tarea/show.html.twig', array(
            'tarea' => $tarea,
            'delete_form' => $deleteForm->createView(),
        ));
    }
    
    

    /**
     * Displays a form to edit an existing Tarea entity.
     *
     * @Route("/{id}/edit", name="tarea_edit")
     * @Method({"GET", "POST"})
     */
    public function editAction(Request $request, Tarea $tarea, TranslatorInterface $translator/*, AuthorizationCheckerInterface $authorizationChecker*/)
    {
        // revisamos roles
        /*$access2 = $authorizationChecker->isGranted(new Expression(
                'has_role("ROLE_TAREA_EDIT") or has_role("ROLE_TAREA_ALL")'
        ));

        if (!$access2) {
            $html = $this->renderView('Exception/error-acceso.html.twig', array(
            ));
            $response = new Response($html, Response::HTTP_FORBIDDEN);
            return $response;
        }*/

        if ($this->container->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            $user = $this->container->get('security.token_storage')->getToken()->getUser();
        }

        if ($tarea->getUserId()->getId() == $user->getId()) {
            //return new Response('tuyo');
        } else {
            //return new Response('no tuyo');
            return $this->redirectToRoute('tarea', []);
        }
        $deleteForm = $this->createDeleteForm($tarea);
        $editForm = $this->createForm('AppBundle\Form\TareaType', $tarea);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $em = $this->getDoctrine()->getManager();
            //$tarea->setUserUpdateId($user->getId());
            $em->persist($tarea);
            $em->flush();
            
            // traduccion flash
            $translated = $translator->trans('flash_mensaje.editado');
            
            $this->get('session')->getFlashBag()->add('success', $translated);
            return $this->redirectToRoute('tarea_edit', array('id' => $tarea->getId()));
        }
        return $this->render('tarea/edit.html.twig', array(
            'tarea' => $tarea,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }
    
    

    /**
     * Deletes a Tarea entity.
     *
     * @Route("/{id}", name="tarea_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, Tarea $tarea, TranslatorInterface $translator, AuthorizationCheckerInterface $authorizationChecker)
    {
        // revisamos roles
        /*$access2 = $authorizationChecker->isGranted(new Expression(
                'has_role("ROLE_TAREA_DELETE") or has_role("ROLE_TAREA_ALL")'
        ));

        if (!$access2) {
            $html = $this->renderView('Exception/error-acceso.html.twig', array(
            ));
            $response = new Response($html, Response::HTTP_FORBIDDEN);
            return $response;
        }*/

        if ($this->container->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            $user = $this->container->get('security.token_storage')->getToken()->getUser();
        }

        if ($tarea->getUserId()->getId() == $user->getId()) {
            //return new Response('tuyo');
        } else {
            //return new Response('no tuyo');
            return $this->redirectToRoute('tarea', []);
        }
        
        $form = $this->createDeleteForm($tarea);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            // delete logico
            //$tarea->setDeleteStatus(0);
            //$tarea->setDeletedAt(new \DateTime());
            //$tarea->setUserDeleteId($user);
            $em->persist($tarea);
            //$em->remove($tarea);
            $em->flush();
            
            // traduccion flash
            $translated = $translator->trans('flash_mensaje.eliminado', array('%entity%' => 'Tarea'));
            
            $this->get('session')->getFlashBag()->add('success', $translated);
        } else {
            // traduccion flash
            $translated = $translator->trans('flash_mensaje.problema_eliminar', array('%entity%' => 'Tarea'));
            
            $this->get('session')->getFlashBag()->add('error', $translated);
        }
        
        return $this->redirectToRoute('tarea');
    }
    
    /**
     * Creates a form to delete a Tarea entity.
     *
     * @param Tarea $tarea The Tarea entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(Tarea $tarea)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('tarea_delete', array('id' => $tarea->getId())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
    
    /**
     * Delete Tarea by id
     *
     * @Route("/delete/{id}", name="tarea_by_id_delete")
     * @Method("GET")
     */
    public function deleteByIdAction(Tarea $tarea, TranslatorInterface $translator, AuthorizationCheckerInterface $authorizationChecker){
        // revisamos roles
        /*$access2 = $authorizationChecker->isGranted(new Expression(
                'has_role("ROLE_TAREA_DELETE") or has_role("ROLE_TAREA_ALL")'
        ));

        if (!$access2) {
            $html = $this->renderView('Exception/error-acceso.html.twig', array(
            ));
            $response = new Response($html, Response::HTTP_FORBIDDEN);
            return $response;
        }*/

        if ($this->container->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            $user = $this->container->get('security.token_storage')->getToken()->getUser();
        }

        if ($tarea->getUserId()->getId() == $user->getId()) {
            //return new Response('tuyo');
        } else {
            //return new Response('no tuyo');
            return $this->redirectToRoute('tarea', []);
        }
        
        $em = $this->getDoctrine()->getManager();
        
        try {
            // delete logico
            /*$tarea->setDeleteStatus(0);
            $tarea->setDeletedAt(new \DateTime());
            $tarea->setUserDeleteId($user);*/
            $em->persist($tarea);
            //$em->remove($tarea);
            $em->flush();
            // traduccion flash
            $translated = $translator->trans('flash_mensaje.eliminado', array('%entity%' => 'Tarea'));
            $this->get('session')->getFlashBag()->add('success', $translated);
        } catch (Exception $ex) {
            // traduccion flash
            $translated = $translator->trans('flash_mensaje.problema_eliminar', array('%entity%' => 'Tarea'));
            $this->get('session')->getFlashBag()->add('error', $translated);
        }

        return $this->redirect($this->generateUrl('tarea'));

    }
    

    /**
    * Bulk Action
    * @Route("/bulk-action/", name="tarea_bulk_action")
    * @Method("POST")
    */
    public function bulkAction(Request $request, TranslatorInterface $translator, AuthorizationCheckerInterface $authorizationChecker)
    {
        // revisamos roles
        /*$access2 = $authorizationChecker->isGranted(new Expression(
                'has_role("ROLE_TAREA_DELETE") or has_role("ROLE_TAREA_ALL")'
        ));

        if (!$access2) {
            $html = $this->renderView('Exception/error-acceso.html.twig', array(
            ));
            $response = new Response($html, Response::HTTP_FORBIDDEN);
            return $response;
        }*/

        if ($this->container->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            $user = $this->container->get('security.token_storage')->getToken()->getUser();
        }
        
        $ids = $request->get("ids", array());
        $action = $request->get("bulk_action", "delete");

        if ($action == "delete") {
            try {
                $em = $this->getDoctrine()->getManager();
                $repository = $em->getRepository('AppBundle:Tarea');

                foreach ($ids as $id) {
                    $tarea = $repository->find($id);
                    
                    if ($tarea->getUserId()->getId() == $user->getId()) {
                        //return new Response('tuyo');
                    } else {
                        //return new Response('no tuyo');
                        return $this->redirectToRoute('tarea', []);
                    }

                    // delete logico
                    /*$tarea->setDeleteStatus(0);
                    $tarea->setDeletedAt(new \DateTime());
                    $tarea->setUserDeleteId($user);*/
                    $em->persist($tarea);
                    //$em->remove($tarea);
                    $em->flush();
                }
                
                // traduccion flash
                $translated = $translator->trans('flash_mensaje.eliminado_plural', array('%entity%' => 'tareas'));
                $this->get('session')->getFlashBag()->add('success', $translated);

            } catch (Exception $ex) {
                // traduccion flash
                $translated = $translator->trans('flash_mensaje.problema_eliminar_plural', array('%entity%' => 'tareas'));
                $this->get('session')->getFlashBag()->add('error', $translated);
            }
        }

        return $this->redirect($this->generateUrl('tarea'));
    }
    
    
    /**
     * Actualizar estado de tarea
     *
     * @Route("/estado/{id}/{estado}/edit", name="estado_tarea_edit")
     * @Method({"GET", "POST"})
     */
    public function editEstadoAction(Request $request, $id, $estado, TranslatorInterface $translator/*, AuthorizationCheckerInterface $authorizationChecker*/)
    {
        // revisamos roles
        /*$access2 = $authorizationChecker->isGranted(new Expression(
                'has_role("ROLE_TAREA_EDIT") or has_role("ROLE_TAREA_ALL")'
        ));

        if (!$access2) {
            $html = $this->renderView('Exception/error-acceso.html.twig', array(
            ));
            $response = new Response($html, Response::HTTP_FORBIDDEN);
            return $response;
        }*/
        
        /**
         * consultamos tarea
         */
        $em = $this->getDoctrine()->getManager();
        $tarea = $em->getRepository('AppBundle:Tarea')->findOneBy(['id'=>$id]);
        

        if ($this->container->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            $user = $this->container->get('security.token_storage')->getToken()->getUser();
        }

        if ($tarea->getUserId()->getId() == $user->getId()) {
            //return new Response('tuyo');
        } else {
            //return new Response('no tuyo');
            return $this->redirectToRoute('tarea', []);
        }
        

        if ($tarea) {
            $estado = $em->getRepository('AppBundle:EstadoTarea')->findOneBy(['id'=>$estado]);
            $tarea->setEstadoId($estado);
            $em->persist($tarea);
            $em->flush();
            
            // traduccion flash
            $translated = $translator->trans('flash_mensaje.editado');
            
            $this->get('session')->getFlashBag()->add('success', $translated);
            return $this->redirectToRoute('tarea');
        }
        
    }
    

}
