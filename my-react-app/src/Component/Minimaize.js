import React, { useState } from 'react';

const MinMaxText = ({ text, maxLength }) => {
    const [isMinimized, setIsMinimized] = useState(true);

    const toggleMinimized = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <div className='container'>
            {isMinimized ? (
                <div>
                    {text.length > maxLength ? (
                        <p className='text-start'>{`${text.substring(0, maxLength)}...`}</p>
                    ) : (
                        <p>{text}</p>
                    )}
                    <span className="" onClick={toggleMinimized}>
                        Show More
                    </span>
                </div>
            ) : (
                <div>
                    <p>{text}</p>
                    <span className="" onClick={toggleMinimized}>
                        Show Less
                    </span>
                </div>
            )}
            <hr></hr>
                <>
                            <> 
                            <h4 class="text-start" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">Education</h4>
                            <hr></hr>
                            <div class="col-6">
                                        <div class="collapse multi-collapse" id="multiCollapseExample2">
                                        <div class=" card-body " style={{width:'500px'}}> 
                                        <h6 className='text-start'>A Einstein College M Yeshiva University</h6>
                                        Residency Hospital
                                        <h6 className='text-start'>University of Miami Miller School of Medicine</h6>
                                        Medical School, 2001
                                        </div>
                                </div>
                            </div>
                            </>
                            <>
                            <div className='row '>
                                    <h4 class="text-start"type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample1" aria-expanded="false" aria-controls="multiCollapseExample2" >Language</h4>
                            </div>
                            <hr></hr>
                            <div class="col-12">
                                <div class="collapse multi-collapse" id="multiCollapseExample1">
                                <div class=" card-body " style={{width:'500px'}}> 
                                <h6 className='text-start'>English</h6>
                                <h6 className='text-start'>Arabic</h6>
                                </div>
                                </div>
                            </div>
                            </>
                </>
        </div>
    );
};

export default MinMaxText;







{/* <p class="d-inline-flex gap-1">
  <a class="btn btn-primary" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Toggle first element</a>
  <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">Toggle second element</button>
  <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">Toggle both elements</button>
</p>
<div class="row">
  <div class="col">
    <div class="collapse multi-collapse" id="multiCollapseExample1">
      <div class="card card-body">
        Some placeholder content for the first collapse component of this multi-collapse example. This panel is hidden by default but revealed when the user activates the relevant trigger.
      </div>
    </div>
  </div>
  <div class="col">
    <div class="collapse multi-collapse" id="multiCollapseExample2">
      <div class="card card-body">
        Some placeholder content for the second collapse component of this multi-collapse example. This panel is hidden by default but revealed when the user activates the relevant trigger.
      </div>
    </div>
  </div>
</div> */}