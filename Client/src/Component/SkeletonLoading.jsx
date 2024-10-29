import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonLoading({ height, count, width }) {
    return (
        <div>
            <Skeleton
                style={{ height: `${height}px`, width: width || "100%" }}
                count={count}
                aria-live="polite" 
            />
        </div>
    );
}

SkeletonLoading.propTypes = {
    height: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    width: PropTypes.string, 
};

SkeletonLoading.defaultProps = {
    width: "100%", 
};

export default SkeletonLoading;
