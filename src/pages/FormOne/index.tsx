import { useCallback, useRef, useState } from 'react';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';



import getValidationErrors from '../../utils/getValidationErrors';


import Input from '../../components/Input';

interface FormDataFields{
    name:string,
    email:string
}

const FormOne: React.FC = () => {
  
  const [isValidform, setIsValidform] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const handleFormSubmit = useCallback(
    async (data:FormDataFields) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object({
          email: Yup.string()
            .email('Você precisa inserir um e-mail válido')
            .required('O campo é obrigatorio'),
          password: Yup.string().required('O campo é obrigatorio'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });


        console.log(data);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          // Validation failed
          console.log(data);

          const errors = getValidationErrors(error);

          console.dir(errors);
          formRef.current?.setErrors(errors);
        }
      }
    },
    []
  );
  const handleValidateChangesOnForm = useCallback(() => {
    const hasErrors = formRef.current?.getErrors();
    const formData = formRef.current?.getData();

    console.log(hasErrors);

    if (formData !== undefined) {
      const data = Object.values(formData);
      const hasAllFieldFilled = data.every(value => !!value);
      setIsValidform(hasAllFieldFilled);
    }
  }, []);
  return (
      <Form
        onSubmit={handleFormSubmit}
        onChange={handleValidateChangesOnForm}
        ref={formRef}
      >
        <h1>Fazer Login</h1>
        <Input
          name="email"
          id="e-mail"
          type="e-mail"
          label="E-mail"
        />
        <Input
          name="password"
          id="password"
        
          type="password"
          label="Senha"
        />

        <button type="submit">
          Entrar
        </button>

        

      </Form>
  );
};

export default FormOne;
