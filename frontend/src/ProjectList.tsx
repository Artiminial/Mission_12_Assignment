import {useState, useEffect} from "react";
import type { Book } from './types/Project';

function ProjectList(){

const[books, setBooks] = useState<Book[]>([]);
const [pageSize, setPageSize] = useState<number>(5);
const [pageNum, setPageNum] = useState<number>(1);
const [totalItems, setTotalItems] = useState<number>(0);
const [totalPages, setTotalPages] = useState<number>(0);
const [sortOrder, setSortOrder] = useState<string>("asc");

useEffect(() => {
    const fetchBooks = async() => {
        const response = await fetch(`https://localhost:5000/api/book/Books?pageHowMany=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}`);
        const data = await response.json();
        setBooks(data.books);
        setTotalItems(data.totalNumBooks);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    };


    fetchBooks()
}, [pageSize, pageNum, sortOrder]);

    return(
        <><h1> Bookstore Catalog</h1>
        <br/>
        {books.map((b) =>
        <div id="projectCard" className="card mb-3" key={b.bookID}>
            <h3 className="card-title">{b.title}</h3>
                <div className="card-body">
                   <ul className="list-unstyled">
                <li><strong>Author:</strong> {b.author}</li>
                <li><strong>Publisher:</strong> {b.publisher}</li>
                <li><strong>ISBN:</strong> {b.isbn}</li>
                <li><strong>Classification:</strong> {b.classification}</li>
                <li><strong>Category:</strong> {b.category}</li>
                <li><strong>Pages:</strong> {b.pageCount}</li>
                <li><strong>Price:</strong> ${b.price.toFixed(2)}</li>
                    </ul> 
                </div>
            
        </div>
        
        )}

         <div className="mb-3">
            <label>
                Sort by title:
                <select value={sortOrder}
                onChange={(s) => {
                    setSortOrder(s.target.value);
                    setPageNum(1);
                }}>
                    <option value="asc">A to Z</option>
                    <option value="desc">Z to A</option>
                </select>
            </label>
         </div>

         <button  disabled={pageNum === 1} onClick={() =>setPageNum(pageNum - 1)}>Previous</button> 
         
         {[...Array(totalPages)].map((_, index) =>(
            <button key={index + 1} onClick={() => setPageNum(index + 1)}  disabled={pageNum === (index + 1)}>{index + 1}</button>
         ))}
        <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>

        <br></br>
        <label>
            Results per page:
            <select value={pageSize} 
            onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
            }}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
        </label>
        <p>Total books: {totalItems}</p>
        </>
    );
}

export default ProjectList;