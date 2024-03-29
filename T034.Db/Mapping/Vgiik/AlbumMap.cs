﻿using Db.Entity.Vgiik;
using FluentNHibernate.Mapping;

namespace Db.Mapping.Vgiik
{
    public class AlbumMap : ClassMap<Album>
    {
        public AlbumMap()
        {
            Id(x => x.Id).Column("AlbumId").GeneratedBy.Increment();

            Map(p => p.Name);
            Map(p => p.Path);
            References(p => p.Person).Column("PersonId")
                .Not.LazyLoad();
        }
    }
}
