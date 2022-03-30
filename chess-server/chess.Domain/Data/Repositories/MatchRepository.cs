using chess.Domain.Data.Configurations;
using chess.Domain.Entities;
using MongoDB.Driver;
using System.Collections.Generic;

namespace chess.Domain.Data.Repositories
{
    public class MatchRepository : IMatchRepository
    {
        private readonly IMongoCollection<Match> matchs;

        public MatchRepository(IDatabaseConfig databaseConfig)
        {
            var client = new MongoClient(databaseConfig.ConnectionString);
            var database = client.GetDatabase(databaseConfig.DatabaseName);

            this.matchs = database.GetCollection<Match>("matchs");
        }
        public IEnumerable<Match> Get()
        {
            return matchs.Find(match => true).ToList();
        }
        public Match Create(Match match)
        {
            this.matchs.InsertOne(match);
            return match;
        }

        public Match Update(Match matchUpdated)
        {
            matchs.ReplaceOne(match => match.Id == matchUpdated.Id, matchUpdated);
            return matchUpdated;
        }

        public void Delete(string reference)
        {
            this.matchs.DeleteOne(match => match.Reference == reference);
        }

        public Match GetByReference(string reference)
        {
            return matchs.Find(match => match.Reference == reference).FirstOrDefault();
        }
    }
}
