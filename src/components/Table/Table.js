import React from "react";
import styles from "./Table.module.css";

const baseUrl = process.env.SERVER_URL || "http://localhost:5001";

export default function Table(props) {
  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(`${baseUrl}/${props.short}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.headerCell}>Original URL</th>
            <th className={`${styles.headerCell} ${styles.rightAlign}`}>
              Short URL
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.row}>
            <td className={styles.urlCell}>
              <a
                href={`${props.full}`}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.link}
              >
                {props.full}
              </a>
            </td>
            <td className={`${styles.urlCell} ${styles.rightAlign}`}>
              <a href={`${props.full}`} className={styles.link} 
              target="_blank" rel="noreferrer noopener">
                {props.short}
              </a>
              <img
                className={styles.copyUrl}
                title="copy url"
                src="/copy.png"
                alt="copy url"
                onClick={copyToClipboard}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
