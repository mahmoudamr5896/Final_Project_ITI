import React from 'react';
import './CSS/Offer.css';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Offer() {
    return (
        <>
            <h1 className='text-center' style={{ marginTop: '100px' }}>Our offers</h1>
            <div className="container" style={{ marginTop: '50px' }}>
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                        <div className="card">
                            <div className="content">
                                <div className="title">Personal edition</div>
                                <div className="price">$39.99</div>
                                <div className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at posuere eros. Interdum et malesuada fames ac ante ipsum primis in faucibus.</div>
                            </div>
                            <button className='button2'>
                                Buy now
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                        <div className="card">
                            <div className="content">
                                <div className="title">Personal edition</div>
                                <div className="price">$39.99</div>
                                <div className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at posuere eros. Interdum et malesuada fames ac ante ipsum primis in faucibus.</div>
                            </div>
                            <button className='button2'>
                                Buy now
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                        <div className="card">
                            <div className="content">
                                <div className="title">Personal edition</div>
                                <div className="price">$39.99</div>
                                <div className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at posuere eros. Interdum et malesuada fames ac ante ipsum primis in faucibus.</div>
                            </div>
                            <button className='button2'>
                                Buy now
                            </button>
                        </div>

                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                        <div className="card">
                            <div className="content">
                                <div className="title">Personal edition</div>
                                <div className="price">$39.99</div>
                                <div className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at posuere eros. Interdum et malesuada fames ac ante ipsum primis in faucibus.</div>
                            </div>
                            <button className='button2'>
                                Buy now
                            </button>
                        </div>

                    </div>


                </div>
            </div>
        </>
    );
}

export default Offer;
