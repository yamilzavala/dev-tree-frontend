import { forwardRef } from 'react';
import type { FieldErrors, FieldValues } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

type FormInputProps = {
    type: string; 
    name: string; 
    errors: FieldErrors<FieldValues>;
    size?: string;
    label?: string; 
    defaultValue?: string; 
    placeholder?: string;
    className?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    ({label, type, name, defaultValue, size, placeholder, className, errors, ...rest}, ref) => {
        return (
            <div>
                <label htmlFor={name} className='label'>
                    <span className="block text-sm font-medium text-gray-700 mb-1 capitalize">{label}</span>
                </label>
                <input
                    ref={ref}
                    type={type}
                    name={name}
                    defaultValue={defaultValue}
                    className={`text-base-content w-full rounded-lg border-[1px] border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition ${className ?? ''}`}
                    style={{width: '100%'}}
                    placeholder={placeholder}
                    {...rest}
                />
                {(errors[name] && name !== 'image') && (
                    <ErrorMessage>
                        <span className='capitalize'>{errors[name]?.message as string}</span>
                    </ErrorMessage>
                )}
            </div>  
        );
    }
);

export default FormInput;