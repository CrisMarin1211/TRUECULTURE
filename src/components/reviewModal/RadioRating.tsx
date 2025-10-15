import * as React from 'react';
import { styled } from '@mui/material/styles';
import Rating, { type IconContainerProps } from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: { [index: string]: { icon: React.ReactElement; label: string } } = {
  1: { icon: <FavoriteIcon color="error" />, label: '1 corazón' },
  2: { icon: <FavoriteIcon color="error" />, label: '2 corazones' },
  3: { icon: <FavoriteIcon color="warning" />, label: '3 corazones' },
  4: { icon: <FavoriteIcon color="success" />, label: '4 corazones' },
  5: { icon: <FavoriteIcon color="success" />, label: '5 corazones' },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

interface RadioGroupRatingProps {
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number | null) => void;
}

export default function RadioGroupRating({ value, onChange }: RadioGroupRatingProps) {
  return (
    <StyledRating
      name="heart-rating"
      value={value}
      onChange={onChange}
      IconContainerComponent={IconContainer}
      getLabelText={(value: number) => customIcons[value].label}
      highlightSelectedOnly
    />
  );
}
