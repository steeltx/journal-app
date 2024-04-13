import { authSlice, checkingCredentials, login, logout } from "../../../store/auth/authSlide";
import { authenticatedState, demoUser, initialState } from "../../helpers/fixtures/authFixtures";

describe('pruebas en authSlice', () => {

    test('debe de regresar el estado inicial y llamarse auth', () => {
        
        const state = authSlice.reducer(initialState, {});
        
        expect(state).toEqual(initialState);
        expect(authSlice.name).toBe('auth');
    });

    test('debe de realizar la autenticacion', () => {
        // se evalua el nuevo estado que produce la accion de login
        const state = authSlice.reducer(initialState, login(demoUser));
        expect(state).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null
        });
    });

    test('debe de realizar logout sin argumentos', () => {
        const state = authSlice.reducer(authenticatedState, logout());
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        });
    });

    test('debe de realizar logout y mostrar mensaje de error', () => {
        const errorMessage = 'Credenciales no son correctas';
        const state = authSlice.reducer(authenticatedState, logout({errorMessage}));
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        });
    });

    test('debe de cambiar el estado a checking', () => {
        const state = authSlice.reducer(authenticatedState, checkingCredentials());
        expect(state.status).toBe('checking');
    });

});