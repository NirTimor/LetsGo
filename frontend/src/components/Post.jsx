import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Box, colors, IconButton, Tooltip, Skeleton, InputAdornment, List, Paper, Modal } from '@mui/material';
import { CalendarMonth, ThumbUpAlt, Forum, ThumbUpOffAlt, Send, Delete, Favorite, FavoriteBorder as Unfavorite } from "@mui/icons-material";
import Typography from './Typography';
import tripStore, { useTripStore } from '../stores/tripStore';
import { IconAndTextWrapper, getFormattedDate, capitalizeSentence, getMonthName, CountryFlag } from '../utils';
import InputField from './inputs/InputField';
import ActionModal from './modals/ActionModal';
import { useDarkModeStore } from '../stores/darkModeStore';
import { RouterLink, Link } from './Typography';
import authStore, { useAuthStore } from '../stores/authStore';
import ProfilePhoto from './ProfilePhoto';
import usersStore from '../stores/usersStore';
import CarouselModal, { Photo } from './modals/CarouselModal';
import PhotosCollage from './PhotosCollage';
import EditPost from '../app/AuthenticatedApp/Home/EditPost';

const LikeIcon = <ThumbUpAlt fontSize="small" color="primary" />;

const UnlikeIcon = <ThumbUpOffAlt fontSize="small" />

export const PostLayout = ({ Actions, AccountSection, LocationSection, TimeSection, DetailsSection, PhotosSection, LikesAndCommentsSection, CommentsSection }) => (
    <Box sx={{
        border: `1px solid ${colors.grey[400]}`,
        borderRadius: '4px',
        backgroundColor: 'background.default',
        padding: '20px',
        width: '600px',
        display: 'grid',
        gridGap: '10px',
        overflow: 'auto',
        maxHeight: '600px',
        position: 'relative',
    }}>
        <Box sx={{
            position: 'absolute',
            top: '0px',
            right: '0px',
            display: 'flex',
        }}>
            {Actions}
        </Box>
        {AccountSection}
        {LocationSection}
        {TimeSection}
        {DetailsSection}
        {PhotosSection}
        {LikesAndCommentsSection}
        {CommentsSection}
    </Box>
);

export const UserEmailLink = ({ email, name }) => (
    <RouterLink to={`/profile/${email}`}>
        <Link textAlign="center" color="text.primary" width="fit-content" fontWeight={500}>
            {name}
        </Link>
    </RouterLink>
);

export const Account = ({ name, email, creationTime, profilePhoto }) => (
    <IconAndTextWrapper>
        {profilePhoto}
        <Box sx={{ display: 'grid', gridGap: '3px' }}>
            <UserEmailLink email={email} name={name} />
            <Typography type="secondary" variant="body2" fontSize="12px" color="text.secondary">{creationTime}</Typography>
        </Box>
    </IconAndTextWrapper>
);

export const Location = ({ city, country }) => (
    <IconAndTextWrapper>
        <CountryFlag countryName={country} />
        <Typography variant="body2">{city}, {country}</Typography>
    </IconAndTextWrapper>
);

export const Time = ({ startMonth, endMonth, duration, isFlexible }) => (
    <IconAndTextWrapper>
        <CalendarMonth fontSize="small" sx={{ color: 'text.primary' }} />
        <Typography variant="body2">{startMonth}{startMonth === endMonth ? '' : ` - ${endMonth}`}{`, ${duration} days`}{isFlexible ? ' (Flexible)' : ''}</Typography>
    </IconAndTextWrapper>
);

export const Details = ({ details }) => {
    const [showMore, setShowMore] = useState(false);
    const CHRAS_LIMIT = 250;
    const isShowMore = details.length > 400;

    return (
        <Typography variant="body2" sx={{ maxWidth: '600px', lineHeight: '22px' }}>
            {isShowMore ? (showMore ? details : (<>{details.substring(0, CHRAS_LIMIT)} <Link onClick={() => setShowMore(true)}>Show More</Link></>) ) : details}
        </Typography>
    )
};

export const LikesAndComments = ({ isLikedTrip, trip, fetchUnlike, fetchLike, setIsPostModalOpen = () => {} }) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${colors.grey[400]}`, paddingTop: '7px' }}>
        <IconAndTextWrapper>
            <Tooltip title={isLikedTrip? 'Unlike' : 'Like'}>
                <IconButton size="small" color="text.primary" onClick={() => isLikedTrip ? fetchUnlike(trip) : fetchLike(trip)}>
                    {isLikedTrip ? LikeIcon : UnlikeIcon}
                </IconButton>
            </Tooltip>
            <Link textAlign="center" color="text.primary">
                Liked by {trip.likes}
            </Link>
        </IconAndTextWrapper>
        <IconAndTextWrapper>
            <Tooltip title="Add Comment">
                <IconButton size="small" color="text.primary" onClick={() => setIsPostModalOpen(true)}>
                    <Forum fontSize="small" color="inherit" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Add Comment">
                <Link textAlign="center" color="text.primary" onClick={() => setIsPostModalOpen(true)}>
                    {trip.comments.length} Comments
                </Link>
            </Tooltip>
        </IconAndTextWrapper>
    </Box>
);

export const Comment = ({ comment, onClickDelete, userEmail, isDarkMode, name, photo }) => (
    <IconAndTextWrapper>
        <ProfilePhoto size="large" photo={photo} />
        <Box sx={{
            maxWidth: '200px',
            width: '200px',
            background: isDarkMode ? colors.blue[800] : colors.blue[50],
            borderRadius: '7px',
            padding: '7px 10px',
            paddingRight: '4px',
            display: 'grid',
            gridGap: '3px',
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <UserEmailLink email={comment.user_email} name={name} />
                {userEmail === comment.user_email ? (
                    <IconButton sx={{ width: '22px', height: '22px' }} onClick={onClickDelete}>
                        <Delete sx={{ fontSize: '16px' }} />
                    </IconButton>
                ) : (
                    <div></div>
                )}
            </Box>
            <Typography fontWeight={200} variant="body2">
                {comment.text}
            </Typography> 
        </Box>
    </IconAndTextWrapper>
)

export const Comments = observer(({ comments, postId }) => {
    const [modalId, setModalId] = useState(null);
    const [comment, setComment] = useState(null);
    const { addComment, deleteComment } = useTripStore();
    const { isDarkMode } = useDarkModeStore();
    const commentsEndRef = useRef(null);

    const scrollToBottom = () => {
        commentsEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [comments]);

    const onDeleteComment = async () => {
        await deleteComment.fetch(postId, modalId);
        setModalId(null);
    }

    const onSend = () => {
        if (!!comment) {
            setComment('');
            addComment.fetch(postId, comment);
        }
    }

    const onChangeInput = (event) => {
        setComment(event.target.value);
    }

    return (
        <>
            <Box sx={{ borderTop: `1px solid ${colors.grey[400]}`, paddingTop: '7px', paddingBottom: '66px' }}>
                <List sx={{ display: 'grid', gridGap: '10px' }}>
                    {comments.length ? (
                        <>
                            {comments.map((comment) => (
                                <Comment comment={comment} onClickDelete={() => setModalId(comment._id)} name={usersStore.getName(comment.user_email)} photo={usersStore.getProfilePhoto(comment.user_email)} userEmail={comment.user_email} isDarkMode={isDarkMode} />
                            ))}
                            <div ref={commentsEndRef} />
                        </>
                    ) : (
                        <Typography variant="body2">No comments yet</Typography>
                    )}
                </List>
            </Box>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, boxShadow: 'none', margin: '0 1px', boxShadow: '1px 0 4px -2px', borderTopRightRadius: '0', borderTopLeftRadius: '0' }} elevation={3}>
                <Box sx={{ margin: '10px' }}>
                    <InputField
                        id="add-comment"
                        label="Add a comment"
                        multiline
                        onChange={onChangeInput}
                        InputProps={{ 
                            value: comment,
                            endAdornment:
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={onSend}
                                >
                                    <Send />
                                </IconButton>
                            </InputAdornment>
                        }}
                    />
                </Box>
            </Paper>
            <ActionModal 
                open={!!modalId}
                isLoading={deleteComment.isLoading}
                onSubmit={onDeleteComment}
                onClose={() => setModalId(null)}
                title={"Delete Comment"}
                subTitle={"Are you sure you want to delete this comment?"}
            />
        </>
    )
});

export const LoadingPost = () => (
    <PostLayout
        AccountSection={<Account name={<Skeleton variant="text" width={100} />} creationTime={<Skeleton variant="text" width={100} />} profilePhoto={<Skeleton variant="circular" width={40} height={40} />} />}
        DetailsSection={<Details details={<Skeleton variant="rounded" height={100} />} />}
    />
)

const Post = ({ trip, showComments, name, photo }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isPhotosModalOpen, setIsPhotosModalOpen] = useState(false);
    const { user: { liked_trips, favorite_trips} } = useAuthStore();

    const isLikedTrip = liked_trips.includes(trip._id);
    const isFavoriteTrip = favorite_trips.includes(trip._id);

    const onDeleteTrip = async() => {
        await tripStore.deleteTrip.fetch(trip._id);
        setIsDeleteModalOpen(false);
    }

    return (
        <>
            <PostLayout
                Actions={!showComments ? (
                    <>
                        {authStore.user.email === trip.user_email && (
                            <>
                                <EditPost trip={trip} />
                                <IconButton onClick={() => setIsDeleteModalOpen(true)}>
                                    <Delete />
                                </IconButton>  
                            </>
                        )}
                        <IconButton onClick={isFavoriteTrip ? () => tripStore.removeFromFavorites.fetch(trip) : () => tripStore.addToFavorites.fetch(trip)}>
                            {isFavoriteTrip ? <Favorite sx={{ color: colors.red[600] }} /> : <Unfavorite />}
                        </IconButton>
                    </>
                ) : null}
                AccountSection={
                    <Account 
                        name={name || trip.user_email} 
                        email={trip.user_email}
                        creationTime={getFormattedDate(new Date(trip.creation_datetime))} 
                        profilePhoto={(
                            <Box onClick={() => setIsPhotosModalOpen(true)} sx={{ position: 'relative', cursor: 'pointer' }}>
                                <ProfilePhoto size="large" photo={photo} />
                            </Box>
                        )} 
                    />
                }
                LocationSection={
                    <Location 
                        city={capitalizeSentence(trip.city)} 
                        country={capitalizeSentence(trip.country)} 
                    />}
                TimeSection={
                    <Time 
                        startMonth={getMonthName(trip.start_month)} 
                        endMonth={getMonthName(trip.end_month)} 
                        duration={trip.duration_days} 
                        isFlexible={trip.is_flexible} 
                    />}
                DetailsSection={
                    <Details 
                        details={trip.details} 
                    />}
                PhotosSection={
                    <PhotosCollage
                        photos={trip.photos}
                    />
                }
                LikesAndCommentsSection={showComments ? null : (
                    <LikesAndComments 
                        isLikedTrip={isLikedTrip} 
                        trip={trip} 
                        fetchUnlike={tripStore.unlikeTrip.fetch} 
                        fetchLike={tripStore.likeTrip.fetch} 
                        setIsPostModalOpen={setIsPostModalOpen} 
                    />
                )}
                CommentsSection={showComments ? (
                    <Comments 
                        comments={trip.comments}
                        postId={trip._id}
                    />
                ) : null}
            />
            <CarouselModal open={isPhotosModalOpen} onClose={() => setIsPhotosModalOpen(false)}>
                {usersStore.getPhotos(trip.user_email).map((photo) => (
                    <Photo photo={photo} />
                ))}
            </CarouselModal>
            <ActionModal 
                open={isDeleteModalOpen}
                isLoading={tripStore.deleteTrip.isLoading}
                onSubmit={onDeleteTrip}
                onClose={() => setIsDeleteModalOpen(false)}
                title={"Delete Trip"}
                subTitle={"Are you sure you want to delete this trip?"}
            />
            <Modal
                open={isPostModalOpen}
                onClose={() => setIsPostModalOpen(false)}
            >
                <Box sx={{ 
                    width: 'fit-content',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}>
                    <Post trip={trip} showComments={true} name={name} photo={photo} />
                </Box>
            </Modal>
        </>
    )
}

export default observer(Post);
