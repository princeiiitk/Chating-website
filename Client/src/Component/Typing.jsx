import PropTypes from 'prop-types';

function Typing({ className = '', width = 100, height = 100 }) { 
    return (
        <div className={className}>
            <lottie-player
                src="https://assets8.lottiefiles.com/packages/lf20_xxgrirnx.json"
                background="transparent"
                speed="1"
                style={{ width: `${width}px`, height: `${height}px` }}
                loop
                autoplay
                aria-label="Typing animation" 
                role="img" 
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
