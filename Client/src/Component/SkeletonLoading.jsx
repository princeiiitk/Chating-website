
import PropTypes from 'prop-types'; 
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonLoading({ height, count }) {
    return (
        <div>
            <Skeleton style={{ height: `${height}px`, width: "100%" }} count={count} />
        </div>
    );
}


SkeletonLoading.propTypes = {
    height: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,   
};

export default SkeletonLoading;
