import { ImSpinner11 } from "react-icons/im";

type SubmitBtnProps = {
    text?: string;
    className: string;
    children: React.ReactNode;
    isSubmitting: boolean;
}

export const SubmitBtn = ({text, className, children, isSubmitting}:SubmitBtnProps) => {
    return (
        <button className={className} type="submit" disabled={isSubmitting}>
            {isSubmitting ? 
               (                    
                    <ImSpinner11 className='animate-spin' />
               ) :                 
            //    (text || 'submit')
            children
            }
        </button>
    );
};

export default SubmitBtn;