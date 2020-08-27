using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class omg : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           

            migrationBuilder.CreateTable(
                name: "MyRates",
                columns: table => new
                {
                    RateID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CarRating = table.Column<string>(nullable: true),
                    ServiceRating = table.Column<string>(nullable: true),
                    MyCarId = table.Column<int>(nullable: false),
                    MyServiceId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MyRates", x => x.RateID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
           

            migrationBuilder.CreateTable(
                name: "Rates",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CarRating = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MyCarId = table.Column<int>(type: "int", nullable: false),
                    MyServiceId = table.Column<int>(type: "int", nullable: false),
                    ServiceRating = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rates", x => x.Id);
                });
        }
    }
}
