
import { Avatar } from "antd";
import { CommentDetails, CommentDiv, CreatedDate, DivContainer, CommentItem } from "./styled";
import { UserOutlined } from "@ant-design/icons";
import moment from 'moment';

const Comments = ({ comments }) => {

    return (
        <DivContainer>

            {
                comments?.map((comment, index) =>
                    <CommentItem key={index}>
                        <div>
                            <Avatar size={48} icon={<UserOutlined />} />
                        </div>
                        <CommentDiv>
                            <div style={{ fontSize: '12px' }}>
                                <span>{comment?.Customer?.fullname}</span>
                            </div>
                            <CreatedDate>
                                {moment(comment.createdAt).calendar()}
                            </CreatedDate>
                            <CommentDetails>
                                {comment.text}
                            </CommentDetails>

                        </CommentDiv>
                    </CommentItem>
                )
            }


        </DivContainer>
    );
}

export default Comments