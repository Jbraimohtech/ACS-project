interface Props {
  totalArticles: number;
}

const NewsHeader = ({
  totalArticles,
}: Props) => {
  return (
    <div className="novaNewsHeader">
      <h1>News Feed</h1>

      <p>
        Stay updated with the
        latest news, programs,
        workshops and community
        updates.
      </p>

      <div className="novaNewsStats">
        <span>
          {totalArticles} Articles
        </span>
      </div>
    </div>
  );
};

export default NewsHeader;