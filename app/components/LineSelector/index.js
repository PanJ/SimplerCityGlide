import React, { PropTypes } from 'react';

import styles from './styles.css';

const lines = ['16', '20', '23', '26', '36', '39', '49', '50', '59', '60', '63', '70', '79', '80', '84', '102', '129', '138', '140', '145', '168', '204', '503', '505', '509', '510', '511', '514', '515', '522', '555', '556', 'A2', 'A1'];
function LineSelector(props) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.span}>สาย</span>
      <select onChange={(e) => props.lineChanged(e.target.value)} value={props.line} className={styles.select}>
        <option value="">- เลือก -</option>
        {
          lines.map((line) => <option key={line} value={line}>{line}</option>)
        }
      </select>
      <label className={styles.label} htmlFor="inbound">
        <input onChange={() => props.boundChanged('1')} checked={props.bound === '1'} className={styles.radio} id="inbound" type="radio" name="bound" value="1" /> เข้าเมือง
      </label>
      <label className={styles.label} htmlFor="outbound">
        <input onChange={() => props.boundChanged('2')} checked={props.bound === '2'} className={styles.radio} id="outbound" type="radio" name="bound" value="2" /> ออกเมือง
      </label>
    </div>
  );
}

LineSelector.propTypes = {
  lineChanged: PropTypes.func,
  boundChanged: PropTypes.func,
  line: PropTypes.string,
  bound: PropTypes.string,
};

export default LineSelector;
