import React, {useEffect, useState} from 'react';
import axios from "axios";
import _ from "lodash";

const pageSize = 10;
const Employee = () => {
    const [posts, setposts]= useState();
    const [paginatedposts, setpaginatedPosts] = useState();
    const [currentPage, setcurrentPage] = useState(1)

    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(res=>{
console.log(res.data);
setposts(res.data);
setpaginatedPosts(-(res.data).slice(0).take(pageSize).value());
        });
    },[])
    const pageCount = posts? Math.ceil(posts.length/pageSize) : 0;
    if (pageCount === 1) return null ;
    const pages = _.range(1, pageCount+1);
    const pagination=(pageNo)=>{
        setcurrentPage(pageNo);
        const startIndex = (pageNo -1) * pageSize;
        const paginatedPost = _(posts).slice(startIndex).take(pageSize).value();
        setpaginatedPosts(paginatedPost)
    }
  return <div>{
      !paginatedposts ? ("No data found"):(
          <table className='table'>
              <thread>
                  <th>
                  <th>ID</th>
                  <th>User Id</th>
                  <th>Title</th>
                  <th>Status</th>
                  </th>
              </thread>
              <tbody>
                  {paginatedposts.map((post, index)=>(
                  <tr key = {index}>
                      <td> {post.id}</td>
                      <td> {post.userId}</td>
                      <td> {post.title}</td>
                      <td>
                          <p
                           className={
             post.completed ? "btn btn-success" : "btn btn-danger"
                          }
                          >
                          {post.completed?"Completed": "Pending"}
                           </p>
                      </td>
                      </tr>
                  ))
                 }
              </tbody>          
          </table>
          )}
          <nav className="d-flex jusstiyf-content-center">
              <ul className="pegination">
                  {
                      pages.map((page) => (
                <li className={
                page === currentPage? "page-item active" : "page-item"
                }
                >
                <p className="page-link"
                onClick={ () =>pagination (page)}
                >{page}</p>
                </li>
                      ))
                  }
              </ul>
          </nav>
          </div>
        
};

export default Employee;