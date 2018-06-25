import React from 'react';
import Post from './post';

const BlogListFilter = ({ blogs, filter, ...props }) => (
    <div>
        <select value={filter} onChange={(e) => {props.onFilter(e.target.value)} }>
            <option value=''>All</option>
            <option value='active'>Active</option>
            <option value='inactive'>Inactive</option>
        </select>
        <div>
            {/* {alert(JSON.stringify(blogs))} */}
            {blogs
                .sort((a, b) => { return (a.date - b.date) })
                .filter((i) => (filter === '' || filter === i.status))
                .reverse()
                .slice(0, 15)
                .map((i) => (i.content.length >= 150 ? { ...i, content: i.content.substring(0, 150).concat('...') } : i))
                .map((i) => ( {...i, date: new Date(i.date).toLocaleDateString() } ))
                .map((i) => ( {...i, url: i.url } ))
                .map((i) => (i.state === 'active' ? {...i, state: <font color="green">{i.state}</font>} : {...i, state: <font color="red">{i.state}</font>} ))
                .map((item) => (<div key={item.id}><Post post={item}/></div>))
            }
        </div>
    </div>
);

export default BlogListFilter;