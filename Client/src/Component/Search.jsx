import PropTypes from 'prop-types';
import SkeletonLoading from './SkeletonLoading';

function Search({ type, isLoading, searchResults, handleClick, search }) {
    return (
        <div className={`scrollbar-hide overflow-y-scroll h-[250px] mb-5 bg-[#fff] flex flex-col gap-y-3 pt-3 ${search ? "" : "hidden"}`}>
            {isLoading ? (
                <SkeletonLoading height={55} count={3} />
            ) : (
                searchResults.length > 0 ? (
                    searchResults.map((e) => (
                        <div key={e._id} className='flex items-center justify-between'>
                            <div className='flex items-center gap-x-2'>
                                <img
                                    className='w-[42px] h-[42px] rounded-full'
                                    src={e.profilePic || "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}
                                    alt={`${e.name}'s avatar`}
                                    onError={(e) => e.target.src = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"} // Fallback image
                                />
                                <div className='flex flex-col gap-y-[1px]'>
                                    <h5 className='text-[15px] text-[#111b21] tracking-wide font-medium'>{e.name}</h5>
                                    <h5 className='text-[12px] text-[#68737c] tracking-wide font-normal'>{e.email}</h5>
                                </div>
                            </div>
                            <button
                                onClick={() => handleClick(e)}
                                className='bg-[#0086ea] px-3 py-2 text-[10.6px] tracking-wide text-[#fff]'
                                aria-label={`Add ${e.name}`}
                            >
                                Add
                            </button>
                        </div>
                    ))
                ) : (
                    <span className='text-[13px]'>No results found</span>
                )
            )}
        </div>
    );
}

Search.propTypes = {
    type: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    searchResults: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            profilePic: PropTypes.string,
        })
    ).isRequired,
    handleClick: PropTypes.func.isRequired,
    search: PropTypes.bool.isRequired,
};

export default Search;
