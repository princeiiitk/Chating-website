

import PropTypes from 'prop-types'; 

function Typing({ className, width, height }) {
    return (
        <div className={className}>
            <lottie-player
                src="https://assets8.lottiefiles.com/packages/lf20_xxgrirnx.json"
                background="transparent"
                speed="1"
                style={{ width: `${width}px`, height: `${height}px` }}
                loop
                autoplay
            ></lottie-player>
        </div>
    );
}


Typing.propTypes = {
    className: PropTypes.string, 
    width: PropTypes.number.isRequired, 
    height: PropTypes.number.isRequired,
};

export default Typing;
