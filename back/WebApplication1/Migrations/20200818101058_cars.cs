using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class cars : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CarCompanies",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    Rating = table.Column<double>(nullable: false),
                    CityExpositure = table.Column<string>(nullable: true),
                    Img = table.Column<string>(nullable: true),
                    Cadmin = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarCompanies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Cars",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(nullable: true),
                    ModelOfCar = table.Column<string>(nullable: true),
                    TypeOfCar = table.Column<int>(nullable: false),
                    NumberOfSeats = table.Column<int>(nullable: false),
                    Price = table.Column<double>(nullable: false),
                    Rating = table.Column<double>(nullable: false),
                    Image = table.Column<string>(nullable: true),
                    NameOfCompany = table.Column<string>(nullable: true),
                    IsReserved = table.Column<bool>(nullable: false),
                    CarCompanyId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cars", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cars_CarCompanies_CarCompanyId",
                        column: x => x.CarCompanyId,
                        principalTable: "CarCompanies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cars_CarCompanyId",
                table: "Cars",
                column: "CarCompanyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cars");

            migrationBuilder.DropTable(
                name: "CarCompanies");
        }
    }
}
