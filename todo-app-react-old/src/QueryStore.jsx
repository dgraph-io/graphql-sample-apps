import { decorate, observable, action } from "mobx";

class QueryStore {
    query = ""

    setQuery(query) {
        this.query = query;
    }
}

decorate(QueryStore, {
    query: observable,
    setQuery: action,
});

export default new QueryStore();