import React from 'react';
import { observer } from "mobx-react-lite";
import QueryStore from './QueryStore';
import './App.css';

const QueryHistory = () => {
    return <div className="query">{QueryStore.query}</div>
}

export default observer(QueryHistory);