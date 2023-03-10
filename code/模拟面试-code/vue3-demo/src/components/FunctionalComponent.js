/**
 * @description functional component
 * @author 双越老师
 */

import { h } from 'vue'

function MyHeader(props) {
    return h(`h${props.level}`, props.title)
}

MyHeader.props = ['level', 'title']

export default MyHeader