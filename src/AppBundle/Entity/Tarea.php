<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Tarea
 *
 * @ORM\Table(name="tarea")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\TareaRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class Tarea {

    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="titulo", type="string", length=255)
     * @Assert\NotBlank
     * @Assert\NotNull
     * @Assert\Length(
     *      min = 3,
     *      max = 255,
     *      minMessage = "Minimo {{ limit }} caracteres",
     *      maxMessage = "Maximo {{ limit }} caracteres"
     * )
     */
    private $titulo;

    /**
     * @var string
     *
     * @ORM\Column(name="descripcion", type="string", length=255, nullable=true)
     */
    private $descripcion;

    /**
     * @var int
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", nullable=true)
     */
    private $userId;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=true)
     */
    private $createdAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated_at", type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @var int
     *
     * @ORM\Column(name="estado_id", type="integer")
     */
    private $estadoId;

    /**
     * Get id
     *
     * @return int
     */
    public function getId() {
        return $this->id;
    }

    /**
     * Set titulo
     *
     * @param string $titulo
     *
     * @return Tarea
     */
    public function setTitulo($titulo) {
        $this->titulo = $titulo;

        return $this;
    }

    /**
     * Get titulo
     *
     * @return string
     */
    public function getTitulo() {
        return $this->titulo;
    }

    /**
     * Set descripcion
     *
     * @param string $descripcion
     *
     * @return Tarea
     */
    public function setDescripcion($descripcion) {
        $this->descripcion = $descripcion;

        return $this;
    }

    /**
     * Get descripcion
     *
     * @return string
     */
    public function getDescripcion() {
        return $this->descripcion;
    }

    
    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Tarea
     */
    public function setCreatedAt($createdAt) {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt() {
        return $this->createdAt;
    }

    /**
     * Set updatedAt
     *
     * @param \DateTime $updatedAt
     *
     * @return Tarea
     */
    public function setUpdatedAt($updatedAt) {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt
     *
     * @return \DateTime
     */
    public function getUpdatedAt() {
        return $this->updatedAt;
    }

    /**
     * Set estadoId
     *
     * @param integer $estadoId
     *
     * @return Tarea
     */
    public function setEstadoId($estadoId) {
        $this->estadoId = $estadoId;

        return $this;
    }

    /**
     * Get estadoId
     *
     * @return int
     */
    public function getEstadoId() {
        return $this->estadoId;
    }

    /**
     * @ORM\PrePersist
     */
    public function setCreatedAtValue() {
        $this->createdAt = new \DateTime();
    }

    /**
     * @ORM\PrePersist
     */
    public function setUpdatedAtValue() {
        $this->updatedAt = new \DateTime();
    }


    /**
     * Set userId
     *
     * @param \AppBundle\Entity\User $userId
     *
     * @return Tarea
     */
    public function setUserId(\AppBundle\Entity\User $userId = null)
    {
        $this->userId = $userId;

        return $this;
    }

    /**
     * Get userId
     *
     * @return \AppBundle\Entity\User
     */
    public function getUserId()
    {
        return $this->userId;
    }
}
