import React from 'react';
import ReactMarkdown from 'react-markdown';
import Typography from '@material-ui/core/Typography';

const renderers = {
  heading: props => (
    <Typography
      gutterBottom
      variant={`h${Math.min(props.level + 5, 6)}`}
      component={`h${Math.min(props.level + 3, 6)}`}
      {...props}
    />
  ),
};

const Markdown = props => <ReactMarkdown {...props} renderers={renderers} />;

export default Markdown;
