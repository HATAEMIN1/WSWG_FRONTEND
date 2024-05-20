import React, { useState } from 'react';
import axiosInstance from '../../utils/axios';
import InputWrap from '../../components/Form/Input';
import { SectionWrap } from '../../components/Layout/Section';

function MeetingOpenLink({Linkurl}) {
    const [url, setUrl] = useState('');
    const [metaData, setMetaData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    const fetchMetaData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get("/meet-posts", {url});
            setMetaData(response.data);
        } catch (error) {
            setError('정확한 오픈채팅방 URL을 입력해주세요.');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <SectionWrap basicSection={true}>
            {/* <InputWrap>
                    <input
                        type="text"
                        placeholder="오픈 채팅 링크 주소를 입력하세요"
                        class="text-center"
                        name="chatLink"
                        value={url}
                        onChange={handleUrlChange}
                    />
            </InputWrap> */}
            {/* <button onClick={fetchMetaData} disabled={!url}>
                Fetch Meta Data
            </button> */}
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {metaData && (
                <div className="container flex border rounded-md">
                    <div className="w-1/3"><img src={metaData.image} alt="Meta"/></div>
                    <div className="w-full flex-wrap justify-between flex-auto p-[10px]">
                        <p className="font-semibold">{metaData.title}</p>
                        <p className="text-sm text-gray-500">{metaData.description}</p>
                        <p className="text-sm"><a href={metaData.url} target="_blank" rel="noopener noreferrer">{metaData.url}</a></p>
                    </div>
                </div>
            )}
        </SectionWrap>
    );
}

export default MeetingOpenLink;
