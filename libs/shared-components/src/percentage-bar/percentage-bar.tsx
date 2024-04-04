import React from 'react';
import { makeStyles } from 'tss-react/mui';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IDatagridPercentageBarProps {
    value: number;
}

const PercentageBar: React.FC<IDatagridPercentageBarProps> = (props) => {
    const { classes, cx } = useStyles(props);
    const valueInPercent = props.value * 100;

    return (
        <div className={cx(classes.container)}>
            <div className={cx(classes.value)}>{`${valueInPercent.toLocaleString()} %`}</div>
            <div
                className={cx(classes.bar, {
                    low: valueInPercent < 30,
                    medium: valueInPercent >= 30 && valueInPercent <= 70,
                    high: valueInPercent > 70,
                })}
                style={{ maxWidth: `${valueInPercent}%` }}
            />
        </div>
    );
};

const useStyles = makeStyles<IDatagridPercentageBarProps>()((theme, props) => ({
    container: {
        border: `1px solid ${theme.palette.divider}`,
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: 26,
        borderRadius: 2,
    },
    value: {
        position: 'absolute',
        lineHeight: '24px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    bar: {
        height: '100%',
        '&.low': {
            backgroundColor: '#f44336',
        },
        '&.medium': {
            backgroundColor: '#efbb5aa3',
        },
        '&.high': {
            backgroundColor: '#088208a3',
        },
    },
}));

export function renderDataGridPercentageBar(props: IDatagridPercentageBarProps): React.ReactNode {
    return <PercentageBar value={Number(props.value)} />;
}

export { PercentageBar };
