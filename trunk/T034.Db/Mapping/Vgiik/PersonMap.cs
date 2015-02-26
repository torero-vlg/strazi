using Db.Entity.Vgiik;
using FluentNHibernate.Mapping;

namespace Db.Mapping.Vgiik
{
    public class PersonMap : ClassMap<Person>
    {
        public PersonMap()
        {
            Id(x => x.Id).Column("PersonId").GeneratedBy.Increment();

            Map(p => p.FullName);
            Map(p => p.Title);
            HasMany(x => x.Albums).KeyColumn("PersonId").Not.LazyLoad();
        }
    }
	
	public class FileMap : ClassMap<File>
    {
        public FileMap()
        {
            Id(x => x.Id).Column("NodeId").GeneratedBy.Increment();

            Map(p => p.Path);
            Map(p => p.Description);
        }
    }
}
