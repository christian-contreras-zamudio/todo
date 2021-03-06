<?php
// src/AppBundle/Entity/User.php

namespace AppBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="user")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    public function __construct()
    {
        parent::__construct();
        // your own logic
    }
    
    /**
     * @var string
     *
     * @ORM\Column(name="terminos_condiciones", type="string", length=50, precision=0, scale=0, nullable=false, unique=false)
     * @Assert\NotNull()
     * @Assert\NotBlank(message="acepte los terminos y condiciones")
     */
    private $terminos_condiciones;
    
    

    /**
     * Set terminosCondiciones
     *
     * @param string $terminosCondiciones
     *
     * @return User
     */
    public function setTerminosCondiciones($terminosCondiciones)
    {
        $this->terminos_condiciones = $terminosCondiciones;

        return $this;
    }

    /**
     * Get terminosCondiciones
     *
     * @return string
     */
    public function getTerminosCondiciones()
    {
        return $this->terminos_condiciones;
    }
}
