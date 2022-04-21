import React from 'react'

export default function ContactPage() {
  return (
    <div class="container my-3 mx-5">
        <div class="row">
            <div className="text-warning col-md-6 container my-3 px-3 py-3" >
                <article>
                    <h1 className='display-4'>
                        Contact Us
                    </h1>
                    <p className='text-muted'>
                        <em>
                            Phone: 629-009-3829
                        </em>
                        <br/>
                        <em>
                            Email: cloudNotes@email.com
                        </em>
                    </p>
                </article>
                <article>
                    <h3>
                        Mail us at:
                    </h3>
                    <address className='text-muted'>
                        <em>
                            69, Spook Ave, 
                            Mulholand Drive, TX 39039820
                        </em>
                    </address>
                </article>
                <article>
                    <h3>
                        Find us on Social Media
                    </h3>
                    <p style={{fontSize: "2rem"}}>
                        <a href="https://www.facebook.com/debadityabhar/">
                            <i className="fab fa-facebook-square mx-1 text-primary"></i>
                        </a>
                        <a href="https://www.instagram.com/debadityabhar14/">
                            <i className="fab fa-instagram mx-1 text-danger"></i>
                        </a>
                        <a href="https://github.com/debamckv">
                            <i className="fab fa-github-square mx-1 text-warning"></i>
                        </a>
                    </p>
                </article>
            </div>
            <div className= 'col-md-6 container my-3 bg-warning bg-opacity-50 p-5'>
                <h1 className='my-4 text-center'>
                    We like to hear from you!
                </h1>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Your Name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="name@example.com"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone/Cell #</label>
                    <input type="text" className="form-control" id="phone" placeholder="(999)-999-9999"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="msg" className="form-label">Your Comments</label>
                    <textarea className="form-control" id="msg" rows="5"></textarea>
                </div>
                <div className="my-3">
                    <button type="button" className={`btn btn-dark mx-1`} >
                        Submit
                    </button>
                    <button type="button" className={`btn btn-dark mx-1`} >
                        Clear
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}
