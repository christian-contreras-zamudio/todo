<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class TareaType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('titulo')
            ->add('descripcion')
            /*->add('createdAt')
            ->add('updatedAt')
            ->add('userId', EntityType::class, array(
                'class' => 'AppBundle\Entity\User',
                'choice_label' => 'id',
                'placeholder' => 'Please choose',
                'empty_data' => null,
                'required' => false
 
            )) */
            ->add('estadoId', EntityType::class, array(
                'class' => 'AppBundle\Entity\EstadoTarea',
                'label' => 'Estado',
                'choice_label' => 'nombre',
                'placeholder' => 'Seleccionar',
                'empty_data' => null,
                'required' => true
 
            )) 
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\Tarea'
        ));
    }
}
