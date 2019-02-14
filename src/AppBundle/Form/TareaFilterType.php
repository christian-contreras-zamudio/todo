<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

use Lexik\Bundle\FormFilterBundle\Filter\Form\Type as Filters;


class TareaFilterType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('id', Filters\NumberFilterType::class)
            ->add('titulo', Filters\TextFilterType::class)
            ->add('descripcion', Filters\TextFilterType::class)
            ->add('createdAt', Filters\DateTimeFilterType::class)
            ->add('updatedAt', Filters\DateTimeFilterType::class)
        
            ->add('userId', Filters\EntityFilterType::class, array(
                    'class' => 'AppBundle\Entity\User',
                    'choice_label' => 'id',
            )) 
            ->add('estadoId', Filters\EntityFilterType::class, array(
                    'class' => 'AppBundle\Entity\EstadoTarea',
                    'choice_label' => 'nombre',
            )) 
        ;
        $builder->setMethod("GET");


    }

    public function getBlockPrefix()
    {
        return null;
    }
    
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'allow_extra_fields' => true,
            'csrf_protection' => false,
            'validation_groups' => array('filtering') // avoid NotBlank() constraint-related message
        ));
    }
}
