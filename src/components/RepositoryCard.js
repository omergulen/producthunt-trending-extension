import React from 'react';

import styled from '@emotion/styled';

import { ReactComponent as CalendarIcon } from '../images/calendar.svg';
import { ReactComponent as UpIcon } from '../images/up.svg';
import { ReactComponent as CommentIcon } from '../images/comment.svg';

import Icon from './Icon';
import InfoItem from './InfoItem';

class RepositoryCard extends React.Component {

  render() {
    const { node } = this.props;

    if (node) {
      return (
        <Card href={node.url} target="_blank" >
          <Left>
            <Avatar src={node.thumbnail.url} />
          </Left>
          <Middle>
            <Title>{node.name}</Title>
            <Description>{node.description}</Description>
            <AdditionalInfo>
              <AdditionalInfoSection>
              <AdditionalInfoItem>
                  <InfoItem icon={<Icon glyph={CalendarIcon} />}>
                    {new Date(node.createdAt).toUTCString().slice(0, -13)}
                  </InfoItem>
                </AdditionalInfoItem>
                <AdditionalInfoItem>
                  <InfoItem icon={<Icon glyph={CommentIcon} />}>
                    {node.commentsCount}
                  </InfoItem>
                </AdditionalInfoItem>
                <AdditionalInfoItem>
                  <InfoItem icon={<MakerAvatar src={node.user.profileImage} />}>
                    {node.user.name}
                  </InfoItem>
                </AdditionalInfoItem>
              </AdditionalInfoSection>
            </AdditionalInfo>
          </Middle>
          <Right>
            <CurrentStar>
              <Icon glyph={UpIcon} />
              {node.votesCount}
            </CurrentStar>
          </Right>
        </Card>
      );
    } else {
      return (<div>Loading...</div>)
    }
  }

}


export default RepositoryCard;

const Card = styled.a`
  position: relative;
  width: 720px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  transition: background-color 0.2s;

  &,
  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
    color: initial;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    -webkit-box-shadow: 1px 11px 12px -6px rgba(0,0,0,0.61);
    -moz-box-shadow: 1px 11px 12px -6px rgba(0,0,0,0.61);
    box-shadow: 1px 11px 12px -6px rgba(0,0,0,0.61);
  }
`;

const Left = styled.div`
  margin-right: 20px;
`;

const Middle = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Right = styled.div`
  margin-left: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Avatar = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 5px;
  overflow: hidden;
  border: 0;
  vertical-align: bottom;
`;

const MakerAvatar = styled.img`
  height: 16px;
  width: 16px;
  border-radius: 8px;
  overflow: hidden;
  border: 0;
  vertical-align: bottom;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.84);
`;

const Description = styled.div`
  flex-grow: 1;
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.54);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  box-sizing: border-box;
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: normal;
  flex: 1;
`;

const AdditionalInfo = styled.div`
  display: flex;
  align-items: center;
  color: #586069;
  font-size: 12px;
  margin-top: 14px;
  justify-content: space-between;
`;

const AdditionalInfoSection = styled.div`
  display: flex;
  align-items: center;
`;

const AdditionalInfoItem = styled.div`
  margin-right: 16px;

  &:last-child {
    margin-right: 0;
  }
`;

const CurrentStar = styled.div`
  position: relative;
  left: -4px;
  top: 4px;
  font-size: 40px;
  line-height: 1;
  text-align: center;
  color: rgba(0, 0, 0, 0.38);
  font-weight: 100;
  font-family: 'Futura PT';
`;
