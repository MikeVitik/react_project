export function Description() {
  return (
    <>
      <span className="font-bold text-2xl">
        Ура! Теперь можно начать работать:
      </span>
      <ul className={`marker:text-red list-disc pl-4 pt-1`}>
        <li>Выберите категорию и напишите название текущей задачи</li>
        <li>Запустите таймер («помидор»)</li>
        <li>Работайте пока «помидор» не прозвонит</li>
        <li>Сделайте короткий перерыв (3-5 минут)</li>
        <li>
          Продолжайте работать «помидор» за «помидором», пока задача не будут
          выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).
        </li>
      </ul>
    </>
  );
}