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
                 <p  className='text-start'>{text}</p>
                    )}
                    <span className="" onClick={toggleMinimized}>
                        Show More
                    </span>
                </div>
            ) : (
                <div>
                    <p>{text}</p>
                
                    <span  className='text-start'onClick={toggleMinimized}>
                        Show Less
                    </span>
                </div>
            )}
            <hr></hr>
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