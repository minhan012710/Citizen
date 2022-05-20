import React from 'react';
import { CModal, CModalHeader, CModalBody } from '@coreui/react';

const CivilianViewer = ({ visible, onClose, civilian }) => {
    return(
        <CModal size="lg" visible={visible} onClose={onClose}>
            <CModalHeader>
                Thông tin thêm {civilian?.fullname}
            </CModalHeader>
            <CModalBody>
                <div className="civilian-viewer-row">
                    <div className="civilian-viewer-label">
                        Số CMND
                </div>
                    <div className="civilian-viewer-value">
                        {civilian?.citizenId}
                    </div>
                </div>
                <div className="civilian-viewer-row">
                    <div className="civilian-viewer-label">
                        Ngày Sinh
                </div>
                    <div className="civilian-viewer-value">
                        {civilian?.birthday}
                    </div>
                </div>
                <div className="civilian-viewer-row">
                    <div className="civilian-viewer-label">
                        Giới Tính
                </div>
                    <div className="civilian-viewer-value">
                        {civilian?.gender}
                    </div>
                </div>
                <div className="civilian-viewer-row">
                    <div className="civilian-viewer-label">
                        Quê Quán
                </div>
                    <div className="civilian-viewer-value">
                        {civilian?.origin}
                    </div>
                </div>
                <div className="civilian-viewer-row">
                    <div className="civilian-viewer-label">
                        Địa Chỉ Thường Trú
                </div>
                    <div className="civilian-viewer-value">
                        {civilian?.permanentAddress}
                    </div>
                </div>
                <div className="civilian-viewer-row">
                    <div className="civilian-viewer-label">
                        Địa Chỉ Tạm Trú
                </div>
                    <div className="civilian-viewer-value">
                        {civilian?.temporaryAddress}
                    </div>
                </div>
                <div className="civilian-viewer-row">
                    <div className="civilian-viewer-label">
                        Tôn Giáo
                </div>
                    <div className="civilian-viewer-value">
                        {civilian?.religion}
                    </div>
                </div>
                <div className="civilian-viewer-row">
                    <div className="civilian-viewer-label">
                        Trình Độ Văn Hóa
                </div>
                    <div className="civilian-viewer-value">
                        {civilian?.educationLevel}
                    </div>
                </div>
                <div className="civilian-viewer-row">
                    <div className="civilian-viewer-label">
                        Nghề Nghiệp
                </div>
                    <div className="civilian-viewer-value">
                        {civilian?.career}
                    </div>
                </div>
            </CModalBody>
        </CModal>
    )
}

export default CivilianViewer;