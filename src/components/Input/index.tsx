import Input from '@vtex/styleguide/lib/Input'

import {
    InputHTMLAttributes,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
  } from 'react';
  
  import { useField } from '@unform/core';

interface DefaultInputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
  }

const InputWithUnform:React.FC<DefaultInputProps> = ({name,label, ...rest})=>{
    const elementInputRef = useRef<HTMLInputElement>(null);

    const { fieldName, defaultValue, registerField, error } = useField(name);


    useEffect(() => {
        registerField({
          name: fieldName,
          path: 'value',
          ref: elementInputRef.current,
        });
      }, [fieldName, registerField]);


    return <Input 
        name={name}
        label={<span>{label}</span>}
        {...rest}
        errorMessage={error}
    />
}

export default InputWithUnform