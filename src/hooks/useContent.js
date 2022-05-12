import { useContext } from 'react';
import { ContentContext } from '../contexts/ContentProvider.jsx';

const useAuth = () => useContext(ContentContext);

export default useAuth;
