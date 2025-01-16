import { authTypesDict } from '@/features/Auth/components/AuthForm/utils';
import styles from './styles.module.css'
import AuthForm from '@/features/Auth/components/AuthForm/AuthForm'


const ResetPasswordPage = () => {
    return <>
        <section className={styles.page}>
            <AuthForm 
                authType={authTypesDict.resetPass}
            />
        </section>
    </>
}

export default ResetPasswordPage;