using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace eBikes1.Models
{
    public partial class inclassContext : DbContext
    {
        public inclassContext()
        {
        }

        public inclassContext(DbContextOptions<inclassContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AccelerationMode> AccelerationMode { get; set; }
        public virtual DbSet<Accessories> Accessories { get; set; }
        public virtual DbSet<Battery> Battery { get; set; }
        public virtual DbSet<Bikes> Bikes { get; set; }
        public virtual DbSet<Brakes> Brakes { get; set; }
        public virtual DbSet<CardDetails> CardDetails { get; set; }
        public virtual DbSet<Orders> Orders { get; set; }
        public virtual DbSet<Person> Person { get; set; }
        public virtual DbSet<Wheel> Wheel { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=tcp:5510him.database.windows.net,1433;Initial Catalog=inclass;Persist Security Info=False;User ID=himanshu;Password=Sharedpass123!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AccelerationMode>(entity =>
            {
                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(20);
            });

            modelBuilder.Entity<Accessories>(entity =>
            {
                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(20);
            });

            modelBuilder.Entity<Battery>(entity =>
            {
                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(20);
            });

            modelBuilder.Entity<Bikes>(entity =>
            {
                entity.HasKey(e => e.BikeId);

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20);
            });

            modelBuilder.Entity<Brakes>(entity =>
            {
                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(20);
            });

            modelBuilder.Entity<CardDetails>(entity =>
            {
                entity.HasKey(e => e.CardId);
                
                entity.Property(e => e.Digits)
                    .IsRequired()
                    .HasMaxLength(20);
                entity.Property(e => e.ExpirationMonth)
                    .IsRequired()
                    .HasMaxLength(20);
                entity.Property(e => e.ExpirationYear)
                    .IsRequired()
                    .HasMaxLength(20);


                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(20);
            });

            modelBuilder.Entity<Orders>(entity =>
            {
                entity.HasKey(e => e.OrderId);
            });

            modelBuilder.Entity<Person>(entity =>
            {
                entity.Property(e => e.City)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.Contact)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.Country)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.IsAdmin)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.IsMember)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.Postalcode)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.Province)
                    .IsRequired()
                    .HasMaxLength(20);
            });

            modelBuilder.Entity<Wheel>(entity =>
            {
                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(20);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
