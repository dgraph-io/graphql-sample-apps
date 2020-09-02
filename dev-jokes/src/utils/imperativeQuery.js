import { useQuery } from "@apollo/react-hooks";

const useImperativeQuery = (query) => {
    const { refetch } = useQuery(query, {skip:true});
    const imperativelyCallQuery = (variables) => {
        return refetch(variables);
    };
    return imperativelyCallQuery;
};

export default useImperativeQuery;