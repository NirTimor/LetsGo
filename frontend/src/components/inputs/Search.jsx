import { styled, alpha } from '@mui/material/styles';
import { InputBase, IconButton, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from "@mui/icons-material";
import InputField from './InputField';

export const StyledSearch = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
	  backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
  }));
  
  export const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 1.5),
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
  }));
  
  export const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
	  padding: theme.spacing(1, 1, 1, 0),
	  transition: theme.transitions.create('width'),
	},
}));

const Search = ({ onChange = () => {}, onSend = () => {}, value, ...props }) => (
    <InputField
		id="search"
		multiline
		onChange={onChange}
		sx={{
			borderRadius: '6px',
		}}
		value={value}
		InputProps={{ 
			size: "small",
			placeholder: 'search...',
			sx: {
				paddingRight: '0px',
			},
			endAdornment:
				<InputAdornment position="end">
					<IconButton
						onClick={onSend}
					>
						<SearchIcon />
					</IconButton>
				</InputAdornment>
		}}
		{...props}
	/>
);

export default Search;
