import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Warning.css';


const Warning = props => {
    const { warningList, position } = props;
    const [list, setList] = useState(warningList);

    useEffect(() => {
        setList([...warningList]);

        // eslint-disable-next-line
    }, [warningList]);


    const deleteWarning = id => {
        const listItemIndex = list.findIndex(e => e.id === id);
        const warningListItem = warningList.findIndex(e => e.id === id);
        list.splice(listItemIndex, 1);
        warningList.splice(warningListItem, 1);
        setList([...list]);
    }


    return (
        <>
            <div className={`notification-container ${position}`}>
                {
                    list.map((warning, i) =>
                        <div key={i}
                             className={`notification warning ${position}`}
                             style={{
                                 backgroundColor: warning.backgroundColor,
                                 display: 'flex',
                                 alignItems: 'center' }}
                        >
                            <button className="warning-close" onClick={() => deleteWarning(warning.id)}>
                                <img src={require('../../assets/closeBtn.png')} alt="close-btn" />
                            </button>
                            <div>
                                <p className="notification-message">
                                    {warning.description}
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
}

    Warning.propTypes = {
        warningList: PropTypes.array.isRequired,
        position: PropTypes.string,
        autoDelete: PropTypes.bool,
        dismissTime: PropTypes.number
}

export default Warning;