import React, { FC, memo, ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Marker } from '../../../types';

import { alpha, colors } from '../../../5_constants/theme';

import MarkerInfo from '../../atoms/MarkerInfo';
import Button from '../../atoms/Button';
import ProcessingOverlay from '../../atoms/ProcessingOverlay';

const Root = styled.li`
  padding: 0.3rem;
  border-radius: 1px;
  color: ${colors.grey.toString()};
  transition: ease .2s;
  border-bottom: solid 1px ${colors.borderGray.alpha(alpha.alpha4).toString()};
  border-top: solid 1px transparent;
  border-left: solid 1px transparent;
  border-right: solid 1px transparent;
  
  :hover {
    border-bottom-color: ${colors.blueDark.toString()};
  }
`;
const MarkerWrapper = styled.div`
  cursor: pointer;
`;
const Title = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;
const Description = styled.div`
  font-size: 1.2rem;
`;
const Input = styled.input`
  font-size: 1rem;
  width: 100%;
`;
const ButtonWrapper = styled.div`
  padding: 0.2rem 0;
  text-align: right;
`;
const DeleteBtn = styled(Button)`
  margin-right: .3rem;
  color: ${colors.red.alpha(.8).toString()};
  
  :hover {
    color: ${colors.red.toString()};
    border-color: ${colors.red.toString()};
  }
`;
const SaveButton = styled(Button)`
  color: ${colors.white.toString()};
  background-color: ${colors.green.toString()};
  border-color: ${colors.green.alpha(alpha.alpha8).toString()};
  
  :hover {
    color: ${colors.green.toString()};
    background-color: ${colors.white.toString()};
  }
`;
const UpdateButton = styled(SaveButton)`
  margin-right: .3rem;
`;

interface Props {
  marker: Marker;
  isProcessing: boolean;
  className?: string;
  onSave?(marker: Marker): void;
  onUpdate?(marker: Marker): void;
  onDelete?(id: number): void;
}

const MarkerListItem: FC<Props> = ({ marker, isProcessing, onSave, onUpdate, onDelete, className }: Props) => {
  const [isEditing, setEditing] = useState(false);
  const toggleEdit = () => setEditing(!isEditing);

  const [title, setTitle] = useState(marker.title);
  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

  const [desc, setDescription] = useState(marker.desc);
  const handleDescChange = (e: React.FormEvent<HTMLInputElement>) => setDescription(e.currentTarget.value);

  useEffect(() => {
    // Update the Title & Description when a Marker updated (success/failed)
    if (!isProcessing) {
      setTitle(marker.title);
      setDescription(marker.desc);
    }
  }, [marker, isProcessing]);

  const handleSave: () => void = () => onSave && onSave(marker);
  const handleDelete: () => void = () => onDelete && onDelete(marker.id);
  const handleUpdate: () => void = () => {
    if (onUpdate) {
      onUpdate({
        ...marker,
        title, desc,
      });
    }
    toggleEdit();
  };

  const markerTitle: ReactNode = isEditing ? (
    <Input value={title} onChange={handleTitleChange} />
  ) : (
    <Title>{title}</Title>
  );
  const markerDescription: ReactNode = isEditing ? (
    <Input value={desc} onChange={handleDescChange} />
  ) : (
    <Description>{desc}</Description>
  );

  const editButtonLabel: string = isEditing ? 'Cancel' : 'Edit';
  const updateBtn: ReactNode = isEditing ? (
    <UpdateButton onClick={handleUpdate}>Update</UpdateButton>
  ) : (
    <DeleteBtn onClick={handleDelete}>Delete</DeleteBtn>
  );
  const buttons: ReactNode = marker.id ? (
    <>
      {updateBtn}
      <Button onClick={toggleEdit}>{editButtonLabel}</Button>
    </>
  ) : (
    <>
      <SaveButton onClick={handleSave}>Save</SaveButton>
    </>
  );

  return (
    <Root className={className} >
      <MarkerWrapper>
        {markerTitle}
        {markerDescription}
        <MarkerInfo
          lat={marker.lat}
          lng={marker.lng}
          updated={marker.updated_at}
          created={marker.created_at}
        />
      </MarkerWrapper>
      <ButtonWrapper>
        {buttons}
      </ButtonWrapper>
      <ProcessingOverlay isVisible={isProcessing} />
    </Root>
  );
};

export default memo(MarkerListItem);
