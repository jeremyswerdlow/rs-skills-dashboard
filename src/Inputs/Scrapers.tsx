import Axios from "axios";
import cheerio from "cheerio";
import { ReplaceAll, skillMap, serverMaps, emptySkillMapList } from "../Constants";

export const VitalityScraper = async (url: string): Promise<skillMap[]> => {
  const vitalityServerMap = serverMaps.find((server) => server.name === "Vitality");
  const goal = vitalityServerMap!.defaultGoal;
  let newMaps = [...vitalityServerMap!.skills];

  await Axios.create().get("https://cors-anywhere.herokuapp.com/" + url)
    .then(
      response => {

        const $ = cheerio.load(response.data);
        const tableRows = $("tbody > tr").not(":first-child");

        if ( tableRows.length === 0) {
          newMaps = emptySkillMapList;
          return;
        }

        const experiences: number[] = [];

        tableRows.each(
          (_, tr) => { experiences.push(
            parseInt(ReplaceAll($(tr).find(":nth-child(3)").text(), ",", ""))
          )}
        );

        for (let i in newMaps) {
          newMaps[i].exp = experiences[i];
          newMaps[i].goalExp = newMaps[i].name === "Overall" ? goal * 23 : goal;
        };
      }
    )
    .catch(() => newMaps = [])

  return newMaps

}

export const PkhonorScraper = async (url: string): Promise<skillMap[]> => {
  const PkhonorServerMap = serverMaps.find((server) => server.name === "PkHonor");
  const goal = PkhonorServerMap!.defaultGoal;
  let newMaps = [...PkhonorServerMap!.skills];

  const axiosInstance = Axios.create();
  await axiosInstance.get("https://cors-anywhere.herokuapp.com/" + url)
    .then(
      response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const tableRows: Cheerio = $("tbody > tr");

        if (tableRows.length === 0) {
          newMaps = emptySkillMapList;
          return;
        }

        tableRows.each((_, tr) => {
          const skillName = $(tr).find(":first-child > div").text();
          const exp = parseInt(ReplaceAll($(tr).find(":nth-child(4)").text(), ",", ""));

          newMaps
            .filter((skill) => skill.name === skillName)
            .forEach((skill) => {
              skill.exp = exp;
              skill.goalExp = skill.name === "Overall" ? goal * 23 : goal;
            });
        });

      }
    )
    .catch(console.error)

  return newMaps;

}

export const OSRSScraper = async (url: string): Promise<skillMap[]> => {
  const OSRSServerMap = serverMaps.find((server) => server.name === "Old School Runescape (Normal)");
  const goal = OSRSServerMap!.defaultGoal;
  let newMaps = [...OSRSServerMap!.skills];

  const axiosInstance = Axios.create();
  await axiosInstance.get("https://cors-anywhere.herokuapp.com/" + url)
    .then(
      response => {
        const html = response.data;
        const $ = cheerio.load(html);

        const tableRows = $("div#contentHiscores > table > tbody > tr")
          .not(":first-child")
          .not(":nth-child(2)")
          .not(":nth-child(3)");

        if ( tableRows.length === 0 ) {
          newMaps = emptySkillMapList;
          return;
        }

        tableRows.each((_, tr) => {

          const skillName = $(tr).find(":nth-child(2) > a").text().trim();
          const exp = parseInt(ReplaceAll($(tr).find(":nth-child(5)").text(), ",", ""));

          newMaps
            .filter((skill) => skill.name === skillName)
            .forEach((skill) => {
              skill.exp = exp;
              skill.goalExp = skill.name === "Overall" ? goal * 23 : goal;
            });

        });

        return newMaps;
      }
    )
    .catch(console.error)

  return newMaps;
}