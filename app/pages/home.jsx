import React from 'react'
import NewsHeader from '../components/NewsHeader.jsx'
import NewsItem from '../components/NewsItem.jsx'
export default class Home extends React.Component {
    render(){
        return (
            <div>
                <NewsHeader></NewsHeader>
                <NewsItem/>
            </div>
        )
    }
}