import React from 'react';

/**
 * Main Component Props
 */
export interface Props {
  message?: string;
  className?: string;
  render?: React.ReactElement;
}
/**
 * Main Component
 */
function Index(props: Props) {
  return (
    props.render ?? (
      <button className={props.className}>
        {props.message ?? 'No Message'}
      </button>
    )
  );
}

export default Index;
