<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
        ]);
    }
    
    /**
     * @Route("/soyadmin", name="soyadmin")
     */
     public function eresAdminAction(Request $request) {
      // Retrieve entity manager of doctrine
      $em = $this->getDoctrine()->getManager();
      // Search for the UserEntity, retrieve the repository
      $userRepository = $em->getRepository("AppBundle\Entity\User");
      $user = $userRepository->findOneBy(["email" => "prueba@prueba.com"]);      
      $user->addRole("ROLE_ADMIN");      
      $em->persist($user);
      $em->flush();
      return new Response('Ya eres admin');
      } 
}
