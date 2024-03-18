import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { CheckingAuth } from '../ui/';
import { useCheckAuth } from '../hooks/useCheckAuth';

export const AppRouter = () => {

    // uso de custom hook para revisar la autenticacion
    const { status } = useCheckAuth();

    // mostrar componente de carga si esta en checking
    if (status === 'checking') {
        return <CheckingAuth />
    }
    
    return (
        <Routes>
            {
                status === 'authenticated'
                ? <Route path='/*' element={ <JournalRoutes />} />
                : <Route path='/auth/*' element={ <AuthRoutes />} />
            }
            <Route path='/*' element={<Navigate to='/auth/login' />} />
            {/* <Route path='/auth/*' element={ <AuthRoutes />} />
            <Route path='/*' element={ <JournalRoutes />} /> */}
        </Routes>
    )
}
